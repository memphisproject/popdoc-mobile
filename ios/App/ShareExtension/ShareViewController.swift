//
//  ShareViewController.swift
//  ShareExtension
//
//  Created by Miguel Angelo Dias on 02/11/2020.
//

import UIKit
import Social
import MobileCoreServices


extension NSItemProvider {
    
    var isURL: Bool {
        return hasItemConformingToTypeIdentifier(kUTTypeURL as String)
    }
    
    var isText: Bool {
        return hasItemConformingToTypeIdentifier(kUTTypeText as String)
    }
    
    var isImage : Bool {
        return hasItemConformingToTypeIdentifier(kUTTypeImage as String)
    }
    
}

extension UIImage {
    func toBase64() -> String? {
        guard let imageData = self.pngData() else { return nil }
        return imageData.base64EncodedString(options: Data.Base64EncodingOptions.lineLength64Characters)
    }
}


struct ImageUploadRes: Decodable {
    let filesPreviews : [String]
}

class ShareViewController: SLComposeServiceViewController, CollectionSelectionViewControllerDelegate {
    var selectedCollection = "Collection"
    var selectedCollectionId = "null";
    var userToken = "null";
    var urlString: String = "";
    var textString: String = "";
    var b64Image: String = "";

    override func isContentValid() -> Bool {
        if let defaults = UserDefaults(suiteName: "group.pt.popdocs.elmsley.shareextension") {
            let user = defaults.string(forKey: "currentUser")
            do {
                let userData = user!.data(using: .utf8)!
                let userDataJSON = try JSONDecoder().decode(LoginData.self, from: userData)
                userToken = userDataJSON.token
            } catch let error {
                print(error.localizedDescription)
                return false
            }
        } else {
            return false
        }
        return true
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        let extensionItem = extensionContext?.inputItems[0] as! NSExtensionItem

        let contentTypeURL = kUTTypeURL as String
        let contentTypeText = kUTTypeText as String
        let contentTypeImage = kUTTypeData as String

        for attachment in extensionItem.attachments! {
            if attachment.isURL {
                print("IS URL")
                attachment.loadItem(forTypeIdentifier: contentTypeURL, options: nil, completionHandler: { (results, error) in
                  let url = results as! URL?
                  self.urlString = url!.absoluteString
                })
            }
            if attachment.isText {
                print("IS TEXT")
                attachment.loadItem(forTypeIdentifier: contentTypeText, options: nil, completionHandler: { (results, error) in
                   let text = results as! String
                   self.textString = text
                   _ = self.isContentValid()
                })
            }
            
            if attachment.isImage {
                print("IS IMAGE")
                attachment.loadItem(forTypeIdentifier: contentTypeImage, options: nil, completionHandler: { (results, error) in
                    
                    if let url = results as? URL,
                           let imageData = try? Data(contentsOf: url) {
                            if let image = UIImage(data: imageData) {
                                self.b64Image = (image.pngData()?.base64EncodedString())!
                            }
                    }
                })
            }
        }
    }

    override func didSelectPost() {
        // This is called after the user selects Post. Do the upload of contentText and/or NSExtensionContext attachments.
        if(self.textString != "") {
            createTextTile(id: selectedCollectionId)
        }
        
        if(self.urlString != "") {
            createLinkTile(id: selectedCollectionId)
        }
        
        if (self.b64Image != "") {
            createImageTile(id: selectedCollectionId)
        }
        
        self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
    }

    override func configurationItems() -> [Any]! {
        // To add configuration options via table cells at the bottom of the sheet, return an array of SLComposeSheetConfigurationItem here.
        return [collectionSelectionItem]
    }
    
    lazy var collectionSelectionItem: SLComposeSheetConfigurationItem = {
         let item = SLComposeSheetConfigurationItem()
         item?.title = "Collection"
         item?.value = self.selectedCollection
         item?.tapHandler = self.showCollectionSelection
         return item!
     }()
    
    func showCollectionSelection() {
         let controller = CollectionSelectionViewController(style: .plain)
         controller.selectedCollection = collectionSelectionItem.value
         controller.delegate = self
         pushConfigurationViewController(controller)
     }
    
    func collectionSelection(_ sender: CollectionSelectionViewController, selectedValue: String, selectedValueId: String) {
        collectionSelectionItem.value = selectedValue
        selectedCollection = selectedValue
        selectedCollectionId = selectedValueId;
        
        popConfigurationViewController()
    }
    
    func createTextTile(id: String) {
        let url = "https://dev.memphis.io/api/v1/mosaic/shareext/tile/text"

        let parameters = "{\n    \"content\": \"" + self.textString + "\",\n    \"collection\": \"" + id + "\"\n}"
        let postData = parameters.data(using: .utf8)
        
        var request = URLRequest(url: URL(string: url)!,timeoutInterval: Double.infinity)
        request.addValue("Bearer " + userToken, forHTTPHeaderField: "Authorization")
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")

        request.httpMethod = "POST"
        request.httpBody = postData

        URLSession.shared.dataTask(with: request) { data, response, error in
          guard let data = data else {
            print(String(describing: error))
            return
          }
          print(String(data: data, encoding: .utf8)!)
        }.resume()
    }
    
    func createImageTile(id: String) {
        let url = "https://dev.memphis.io/api/v1/files/uploadOnCloudBase64"
        
        let parameters = "{\"base64file\": \"" + "data:image/png;base64," + self.b64Image + "\"}"
        let postData = parameters.data(using: .utf8)

        var request = URLRequest(url: URL(string: url)!,timeoutInterval: Double.infinity)
        request.addValue("Bearer " + userToken, forHTTPHeaderField: "Authorization")
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")

        request.httpMethod = "POST"
        request.httpBody = postData

        URLSession.shared.dataTask(with: request) { data, response, error in
          guard let data = data else {
            print(String(describing: error))
            return
          }
        do {
            let dataString = String(data: data, encoding: .utf8)!
            print(dataString)
            let dataData = dataString.data(using: .utf8)
            let resDataJSON = try JSONDecoder().decode(ImageUploadRes.self, from: dataData!)
            self.createTileForImageAfterUpload(id: id, imageURL: resDataJSON.filesPreviews[0])
        } catch let error {
            print(error.localizedDescription)
        }
        }.resume()
    }
    
    func createTileForImageAfterUpload(id: String, imageURL: String) {
        let url = "https://dev.memphis.io/api/v1/mosaic/shareext/tile/text"
                
        let parameters = "{\"content\": \"<p><br></p><p><img src=\\\"https:" + imageURL + "\\\" style=\\\"width: 582px;\\\" class=\\\"fr-fic fr-dib\\\"></p>\",\n    \"collection\": \"" + id + "\"\n}"
        
        let postData = parameters.data(using: .utf8)
        
        print(parameters)

        var request = URLRequest(url: URL(string: url)!,timeoutInterval: Double.infinity)
        request.addValue("Bearer " + userToken, forHTTPHeaderField: "Authorization")
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")

        request.httpMethod = "POST"
        request.httpBody = postData

        URLSession.shared.dataTask(with: request) { data, response, error in
          guard let data = data else {
            print(String(describing: error))
            return
          }
          print(String(data: data, encoding: .utf8)!)
        }.resume()
    }
    
    
    func createLinkTile(id: String) {
        let url = "https://dev.memphis.io/api/v1/mosaic/shareext/tile/text"

        let parameters = "{\n    \"content\": \"" + self.urlString + "\",\n    \"collection\": \"" + id + "\"\n}"
        let postData = parameters.data(using: .utf8)

        var request = URLRequest(url: URL(string: url)!,timeoutInterval: Double.infinity)
        request.addValue("Bearer " + userToken, forHTTPHeaderField: "Authorization")
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")

        request.httpMethod = "POST"
        request.httpBody = postData

        URLSession.shared.dataTask(with: request) { data, response, error in
          guard let data = data else {
            print(String(describing: error))
            return
          }
          print(String(data: data, encoding: .utf8)!)
        }.resume()
    }

}

