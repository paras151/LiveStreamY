import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {fetchStreams} from '../../actions'

class StreamList extends React.Component {

    componentDidMount(){
        this.props.fetchStreams();
    }


    renderAdmin(stream){
        console.log(this.props)
        if(stream.userId === this.props.currentUserId){
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className = "ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>

                </div>
            )
        }
    }

    renderList(){
        return this.props.streams.map(stream =>{
        return(
        <div className="item" key={stream.id}>
            <i className="large middle aligned icon camera"/>
            <div className = "content">
                <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
            <div className="description">{stream.description}</div>
            </div>
        <div>{this.renderAdmin(stream)}</div>
        </div>
        )

        })
    }

    renderCreate(){
        if(this.props.isSignedIn){
            return (
                <div style={{textAlign:'right'}}>
                    <Link to="/streams/new" className="ui button primary">
                        New Stream
                    </Link>
                </div>
            )
        }
    }
    render() { 
    return (
        <div>
            <h2>Streams</h2>
            <div className="ui celled list">{this.renderList()}</div>
    <div>{this.renderCreate()}</div>
        </div>  );
    }
}

const mapsStateToProps = state =>{
    return {streams:Object.values(state.streams),
            currentUserId: state.auth.userId,
            isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapsStateToProps,{fetchStreams})(StreamList);