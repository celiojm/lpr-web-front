import React, { useContext} from 'react';
import { Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import {AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import DefaultHeaderDropdown  from './DefaultHeaderDropdown'
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import Context from "../../Context";

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

const DefaultHeader = props => {
    const {user, notifications} = useContext(Context.AuthContext);
    return (
        <React.Fragment>
            <AppSidebarToggler className="d-lg-none" display="md" mobile />
            <AppNavbarBrand
                full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
                minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
            />
            <AppSidebarToggler className="d-md-down-none" display="lg" />
            <Nav className="ml-auto" navbar>
                <DefaultHeaderDropdown notif notifications={notifications} history={props.history}/>
                <DefaultHeaderDropdown onLogout={props.onLogout} accnt user={user} history={props.history}/>
            </Nav>
            <div style={{width: '20px'}}/>
        </React.Fragment>
    );
};

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;