import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

class BusinessList extends React.Component{
  render() {
    return (<div className="BusinessList">
      {
        this.props.businesses.map(function business(com) {
          return <Business business={com} key={business.id}/>;
        })
      }
      </div>);
  }
}

export default BusinessList;
