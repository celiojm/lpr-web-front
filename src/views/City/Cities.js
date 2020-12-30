import React, {useState, useEffect} from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import {toast} from 'react-toastify';
import Services from '../../Services';


const Cities = props =>  {

     const [cities, setCities] = useState([]);

    useEffect(()=>{
        Services.CityService.fetchAll()
            .then(res =>{
                if(res.success){
                    setCities(res.cities);
                }else{
                    toast.warn(res.errorMsg);
                }
            });
    },[]);

    const onDeleteRow = id =>{
        Services.CityService.deleteCity(id)
            .then(res => {
                if(res.success)
                    toast.success('Successfully updated');
            })
    };

        const options = {
            sortIndicator: true,
            hideSizePerPage: true,
            paginationSize: 5,
            hidePageListOnlyOnePage: true,
            clearSearch: false,
            alwaysShowAllBtns: false,
            withFirstAndLast: false,
            deleteRow: true,
            onDeleteRow: onDeleteRow
        };

    const onAfterSaveCell =(row, cellName, cellValue) =>{
        Services.CityService.update(row).then(res =>{
            if(res.success){
                toast.success('Successfully updated');
            }else{
                toast.warn(res.errorMsg);
            }
        });

    };

    const onBeforeSaveCell = (row, cellName, cellValue) => {
        return window.confirm(`Are you really want to save cell "${cellName}" with value "${cellValue}"?`);
    };

    const DateFormatter = (props) =>{
        let date = new Date(props);
        return date.toDateString();
    };

    const Loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"/></div>;

        return (
            <div className="animated">
                <Card>
                    <CardHeader>
                        <i className="icon-menu"/>Cities
                    </CardHeader>
                    <CardBody>
                        <BootstrapTable
                            data={cities}
                            version="4"
                            striped
                            hover
                            pagination
                            search
                            options={options}
                            selectRow={{mode: 'checkbox'} }
                            deleteRow={true}
                            cellEdit={{
                                mode: 'dbclick',
                                blurToSave: true,
                                beforeSaveCell: onBeforeSaveCell,
                                afterSaveCell: onAfterSaveCell,
                            }}>
                            <TableHeaderColumn dataField="city" dataSort>City</TableHeaderColumn>
                            <TableHeaderColumn  dataField="state">State</TableHeaderColumn>
                            <TableHeaderColumn dataField="createdAt" dataFormat={DateFormatter} dataSort editable={false}>Created</TableHeaderColumn>
                            <TableHeaderColumn dataField="updatedAt" dataFormat={DateFormatter} dataSort editable={false}>Updated</TableHeaderColumn>
                            <TableHeaderColumn dataField='_id' isKey={true} hidden={true}>Action</TableHeaderColumn>
                        </BootstrapTable>
                    </CardBody>
                </Card>
            </div>
        );
};

export default Cities;