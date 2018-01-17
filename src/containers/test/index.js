/**
 * Created by rex.ni on 2017/2/25.
 */

import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { EditUpdateProjectInfo } from '../../actions/inputActions'
// import {Link} from 'react-router'
import { connect } from 'react-redux';
const wellStyles = { maxWidth: 700, margin: '0 auto 10px' };



class Test extends Component {


    handleSave() {
        let projectID = this.refs.projectID.refs.input.value;
        console.log('projectID',projectID)
        if (projectID !== "" ) {
            this.props.EditUpdateProjectInfo(projectID, "/test");
        } else {
            alert("不能为空");
        }
    }



    render() {

        return (
            <div>

                <div className="well" style={wellStyles}>
                    <Row type="flex" justify="center" style={{ marginTop: 10 }}>
                        <Col span={4}><a style={{ fontSize: 14 }}>项目ID:</a></Col>
                        <Col span={5}><Input ref="projectID" size="small" placeholder=" "
                            value={this.props.projectID || 0} /></Col>
                    </Row>

                    <Row type="flex" justify="center" style={{ marginTop: 10 }}>
                        <Col span={3}> </Col>
                        <Col span={2}><Button type="primary" onClick={this.handleSave.bind(this)}>保存</Button></Col>
                    </Row>

                </div>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    console.log('mapStateToProps', state)
    return {
        // projectID: state.Edit.data[0].id
        projectID:'11'
        
    }
};

//把 login User 方法sent to userAction    2
const mapDispatchToProps = (dispatch) => {
    return {
        EditUpdateProjectInfo: (projectID) => {
            dispatch(EditUpdateProjectInfo(projectID));
        }
    }
};


// 暴露出去 dispatchToProps
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Test);

// export default Test