import React, { Component } from 'react';
import CollectionManager from '../modules/CollectionManager';
import WishlistManager from '../modules/WishlistManager';
import './VolumeDetails.css'


class VolumeDetail extends Component {

    state = {
        issues: [],
        volumes: [],
        name: ""
    }

    componentDidMount() {
        //getIssueByVolume(id) from CollectionManager and hang on to the data; put it into state
        CollectionManager.getIssueByVolume(this.props.volumeId)
            .then((issues) => {
                console.log(issues)
                this.setState({
                    issues: issues.results,
                    name: issues.name
                });
            });
    }

    createNewCollectionItem = (evt, id) => {
        evt.preventDefault()
        const selectedIssueObject = this.state.issues.find(issue => {
          return issue.id === id
        })
        const entry = {
          coverImg: this.state.small_url,
          title: this.state.name,
          publisher: this.state.publisher,
          publishDate: this.state.start_year,
          userId: parseInt(sessionStorage.getItem("activeUser"))
        }
    
        CollectionManager.createNewCollectionItem(selectedIssueObject)
          .then(() => this.props.history.push("/collection"))
      }

      createNewWishlistItem = (evt, id) => {
        evt.preventDefault()
        const selectedIssueObject = this.state.issues.find(issue => {
          return issue.id === id
        })
        const entry = {
          coverImg: this.state.small_url,
          title: this.state.name,
          publisher: this.state.publisher,
          publishDate: this.state.start_year,
          userId: parseInt(sessionStorage.getItem("activeUser"))
        }
    
        WishlistManager.createNewWishlistItem(selectedIssueObject)
          .then(() => this.props.history.push("/wishlist"))
      }

    render() {
        return (
            <div className="card-container">
                <div className="row hidden-md-up">
                    {this.state.issues.map(issue => (
                        <div className='card-block' key={issue.id}>
                            <img className='card-img-top' src={issue.image.small_url} alt="" />
                            <div className='card-body'>
                                <h2 className='card-title'>Issue #{issue.issue_number} <br></br>{issue.name}</h2>
                            </div>
                            <div>
                                <button type="button" onClick={(evt) => this.createNewCollectionItem(evt, issue.id)}>Add to Collection</button>
                                <button type="button" onClick={(evt) => this.createNewWishlistItem(evt, issue.id)}>Add to Wishlist</button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default VolumeDetail;