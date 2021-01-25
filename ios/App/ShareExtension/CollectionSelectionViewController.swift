//
//  CollectionSelectionViewController.swift
//  ShareExtension
//
//  Created by Miguel Angelo Dias on 02/11/2020.
//

import UIKit
import Foundation

struct Collection: Decodable {
    let _id : String
    let title : String
}

struct LoginData: Decodable {
    let id : String
    let token : String
}

@objc(ColorSelectionViewControllerDelegate)
protocol CollectionSelectionViewControllerDelegate {
    @objc optional func collectionSelection(
        _ sender: CollectionSelectionViewController,
        selectedValue: String, selectedValueId: String)
}

class CollectionSelectionViewController : UITableViewController {
    var TableData:Array<Collection> = Array <Collection>()
    let tableviewCellIdentifier = "collectionSelectionCell"
    var selectedCollection : String = "Collection"
    var delegate: CollectionSelectionViewControllerDelegate?


    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    // Initialize the tableview
    override init(style: UITableView.Style) {
        super.init(style: style)
        fetchCollections()

        tableView.register(UITableViewCell.classForCoder(),
                forCellReuseIdentifier: tableviewCellIdentifier)
        title = "Choose Collection"
    }
    
    func fetchCollections() {
        let url = "https://dev.memphis.io/api/v1/mosaics/shareext"
        
        if let defaults = UserDefaults(suiteName: "group.pt.popdocs.elmsley.shareextension") {
            do {
                let user = defaults.string(forKey: "currentUser")
                let userData = user!.data(using: .utf8)!
                let userDataJSON = try JSONDecoder().decode(LoginData.self, from: userData)
                
                let  token = userDataJSON.token
                
                var collectionList = [Collection] ()

                var request = URLRequest(url: URL(string: url)!,timeoutInterval: Double.infinity)
                request.addValue("Bearer " + token, forHTTPHeaderField: "Authorization")
                request.httpMethod = "GET"

                URLSession.shared.dataTask(with: request) { data, response, error in
                    do {
                        collectionList = try JSONDecoder().decode([Collection].self, from: data!)
                        for collection in collectionList {
                            self.TableData.append(collection);
                        }
                        self.tableView.reloadData()
                        self.tableView.delegate = self;
                    } catch {
                        print("ERROR")
                    }
                }.resume()
            }
            catch {
                print("ERROR")
            }
        }
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.TableData.count
    }
    
    // This just populates each row in the table, and if we've selected it, we'll check it
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(
             withIdentifier: tableviewCellIdentifier,
             for: indexPath) as UITableViewCell
         
        let text = self.TableData[indexPath.row].title
         cell.textLabel!.text = text
         if text == selectedCollection {
             cell.accessoryType = .checkmark
         } else {
             cell.accessoryType = .none
         }
         return cell
    }
    
    // Save the value the user picks
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if let theDelegate = delegate {
            let selectedCollectionTitle = TableData[indexPath.row].title
            let selectedCollectionId = TableData[indexPath.row]._id
            theDelegate.collectionSelection?(self,
                 selectedValue: selectedCollectionTitle,
                 selectedValueId: selectedCollectionId)
       }
    }
}
