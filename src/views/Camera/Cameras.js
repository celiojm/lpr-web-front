import React, {useState, useEffect} from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Select from 'react-select';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import {toast} from 'react-toastify';
import Services from '../../Services';

const initialParams = {
    page: 1,
    sizePerPage: 10,
    sort:{
        cameraId: 'desc'
    },
    filterObj:{}
};

const Cameras = props => {

    const [cities, setCities] = useState({});
    const [citiesForFilter, setCitiesForFilter] = useState({});
    const [stations, setStations] = useState({});
    const [stationsForFilter, setStationsForFilter] = useState({});
    const [dataTotalSize, setDataTotalSize] = useState(0);
    const [params, setParams] = useState(initialParams);
    const [cameras, setCameras] = useState([]);

    /**========================
     *  Fetch cities and stations
     */
    useEffect(() =>{
        Services.CityService.fetchAll()
            .then(res =>{
                if(res.success){
                    let cities = {};
                    let citiesForFilter = {};
                    for(let city of res.cities){
                        cities[city._id] = city;
                        citiesForFilter[city._id] = `${city.city}-${city.state}`;
                    }
                    setCities(cities);
                    setCitiesForFilter(citiesForFilter);
                }else{
                    toast.warn(res.errorMsg);
                }
            });
        Services.StationService.fetchAll()
            .then(res =>{
                if(res.success){
                    let stations = {};
                    let stationsForFilter = {};
                    for(let station of res.stations){
                        stations[station._id] = station;
                        stationsForFilter[station._id] = station.id;
                    }
                    setStations(stations);
                    setStationsForFilter(stationsForFilter);
                }else{
                    toast.warn(res.errorMsg);
                }
            });
    }, []);

    /** ========================
     *  Fetch records with given params
     */
    useEffect(()=>{
        Services.CameraService.fetchAll(params)
            .then(res =>{
                if(res.success){
                    setCameras(res.cameras);
                    setDataTotalSize(res.total);
                }else{
                    toast.warn(res.errorMsg);
                }
            });
    },[params]);

    /** ==========================
     *  Delete event handler
     * @param cameraIds: record _id from mongodb
     */
    const onDeleteRow = cameraIds =>{
        Services.CameraService.deleteCameras(cameraIds)
            .then(res => {
                if(res.success){
                    let newCams = cameras.filter(camera =>{
                        return cameraIds.indexOf(camera._id) === -1;
                    });
                    setCameras(newCams);
                    toast.success(`Excluiu ${res.count} câmeras com sucesso.`);
                }
                else{
                    toast.warn(res.errorMsg);
                }
            })
    };

    /**============================
     *  Page change event handler
     * @param page: current page
     * @param sizePerPage: records number per page
     */
    const onPageChange = (page, sizePerPage) =>{
        let tmp = {...params};
        tmp.page = page;
        tmp.sizePerPage = sizePerPage;
        setParams(tmp);
    };

    /**===========================
     *   Size per page change event handler
     * @param sizePerPage
     */
    const onSizePerPageList = sizePerPage =>{
        let tmp = {...params};
        tmp.sizePerPage = sizePerPage;
        setParams(tmp);
    };

    /**=========================
     *  Column sort event handler
     * @param sortName: column(field) name
     * @param sortOrder: sort order. 'asc' or 'desc
     */
    const onSortChange = (sortName, sortOrder) =>{
        let tmp = {...params};
        tmp.sort = {[sortName]: sortOrder};
        setParams(tmp);
    };

    /**=======================
     *  Column filter event handler.
     * @param filterObj
     */
    const onFilterChange = filterObj =>{
        let tmp = {...params};
        let filter = {};
        for (let [key, value] of Object.entries(filterObj)){
            if(key === 'station' || key === 'city')
                filter[key] = value.value;
            else
                filter[key] = {$regex: `.*${value.value}.*`};
        }
        tmp.filterObj = filter;
        setParams(tmp);
    };

    /**=======================
     *  City column formatter
     * @param city
     * @returns {string}
     * @constructor
     */
    const CityFormatter = city =>{
        return `${city.city}-${city.state}`;
    };

    /**========================
     *  Station column formatter
     * @param station
     * @returns {*}
     * @constructor
     */
    const StationFormatter = station =>{
        return station.id;
    };

    /**=======================
     *  City column custom sort function
     * @param a: first record object(whole row data)
     * @param b: second record object (whole row data)
     * @param order =>'asc' or 'desc'
     * @returns {number}
     */
    const citySort = (a, b, order) => {
        if (order === 'desc') {
            return a.city.city.localeCompare(b.city.city);
        } else {
            return b.city.city.localeCompare(a.city.city);
        }
    };

    /**=======================
     *  Station column custom sort function
     * @param a: first record object(whole row data)
     * @param b: second record object(whole row data)
     * @param order=>'asc' or 'desc'
     * @returns {number}
     */
    const stationSort = (a, b, order) =>{
        if (order === 'desc') {
            return a.station.id.localeCompare(b.station.id);
        } else {
            return b.station.id.localeCompare(a.station.id);
        }
    };

    /**=====================
     *  Datatable option
     * @type {{searchDelayTime: number,
     * sortIndicator: boolean,
     * page: number,
     * sizePerPage: number,
     * hideSizePerPage: boolean,
     * paginationSize: number,
     * hidePageListOnlyOnePage: boolean,
     * alwaysShowAllBtns: boolean,
     * withFirstAndLast: boolean,
     * deleteRow: boolean,
     * onDeleteRow: onDeleteRow,
     * onPageChange: onPageChange,
     * onSizePerPageList: onSizePerPageList,
     * onSortChange: onSortChange,
     * onFilterChange: onFilterChange}}
     */
    const options = {
        searchDelayTime: 1500,
        sortIndicator: true,
        page: params.page,
        sizePerPage: params.sizePerPage,
        hideSizePerPage: false,
        paginationSize: 5,
        hidePageListOnlyOnePage: false,
        alwaysShowAllBtns: false,
        withFirstAndLast: false,
        deleteRow: true,
        onDeleteRow: onDeleteRow,
        onPageChange: onPageChange,
        onSizePerPageList: onSizePerPageList,
        onSortChange: onSortChange,
        onFilterChange: onFilterChange,
    };

    /**==============================
     * Custom Station Editor
     * @param onUpdate
     * @param props
     * @returns {*}
     */
    const createStationEditor = (onUpdate, props) => (<StationEditor onUpdate={onUpdate}{...props}/>);

    const createCityEditor = (onUpdate, props) => (<CityEditor onUpdate={onUpdate}{...props}/>);

    /**============================
     *  Confirm cell edit
     * @param row: whole row data
     * @param cellName: field name
     * @param cellValue: new value
     * @returns {boolean}
     */
    const onBeforeSaveCell = (row, cellName, cellValue) => {
        let label, value, newProperty;
        if(typeof cellValue === 'object'){
            if(cellName === 'station'){
                label = cellValue.id;
                value = cellValue._id;
                newProperty = stations[value];
            }
            else if(cellName === 'city'){
                label = `${cellValue.city}-${cellValue.state}`;
                value = cellValue._id;
                newProperty = cities[value];
            }
        }else{
            label = cellValue;
            value = cellValue;
            newProperty = cellValue;
            if(row[cellName] === cellValue) return false;
        }
        let userInput = window.confirm(`Tem certeza de que deseja salvar o campo "${cellName}" como "${label}"?`);
        if(userInput)
            Services.CameraService.update({id: row._id, query: {[cellName]: value}}).then(res =>{
                if(res.success){
                    let cam = [...cameras];
                    let index = cam.findIndex((element)=> element._id === row._id);
                    cam[index][cellName] = newProperty;
                    setCameras(cam);
                    toast.success('Atualizado com sucesso');
                    return true;
                }else{
                    toast.warn(res.errorMsg);
                    return false;
                }
            });
    };

    return (
        <div className="animated">
            <Card>
                <CardHeader>
                    <i className="icon-menu"/>Câmeras
                </CardHeader>
                <CardBody>
                    <BootstrapTable
                        remote={true}
                        data={cameras}
                        version="4"
                        striped
                        hover
                        cellEdit={{
                            mode: 'dbclick',
                            blurToSave: true,
                            beforeSaveCell: onBeforeSaveCell
                        }}
                        pagination={true}
                        fetchInfo={{dataTotalSize: dataTotalSize}}
                        options={options}
                        selectRow={{mode: 'checkbox'}}
                        deleteRow={true}>

                        <TableHeaderColumn dataField="cameraId" dataSort filter={{type:'TextFilter'}} editable={false} width="150">Id</TableHeaderColumn>
                        <TableHeaderColumn dataField="model" dataSort filter={{type:'TextFilter'}} width="150">Modelo</TableHeaderColumn>
                        <TableHeaderColumn dataField="brand" dataSort filter={{type:'TextFilter'}} width="150">Marca</TableHeaderColumn>
                        <TableHeaderColumn dataField='station'
                                           dataSort sortFunc={stationSort} width="150"
                                           dataFormat={StationFormatter} filterFormatted
                                           customEditor={ { getElement: createStationEditor, customEditorParameters: { stations: stations}}}
                                            filter={ { type: 'SelectFilter', options: stationsForFilter } }>Estação</TableHeaderColumn>

                        <TableHeaderColumn  dataField="city" dataSort sortFunc={citySort}
                                            dataFormat={CityFormatter} filterFormatted
                                            filter={ { type: 'SelectFilter', options: citiesForFilter }}
                                            customEditor={ { getElement: createCityEditor, customEditorParameters: { cities: cities}} } width="200">Cidade</TableHeaderColumn>
                        <TableHeaderColumn  dataField="street" dataSort filter={{type:'TextFilter'}} width="150">Street</TableHeaderColumn>
                        <TableHeaderColumn  dataField="neighborhood" dataSort filter={{type:'TextFilter'}} width="150">Vizinhança</TableHeaderColumn>
                        <TableHeaderColumn  dataField="serialNumber" dataSort filter={{type:'TextFilter'}} width="200">Número de série</TableHeaderColumn>
                        <TableHeaderColumn dataField='_id' isKey={true} hidden={true}>_id</TableHeaderColumn>
                    </BootstrapTable>
                </CardBody>
            </Card>
        </div>
    );
};

class StationEditor extends React.Component {
    constructor(props) {
        super(props);
        this.updateData = this.updateData.bind(this);
        this.formatter = this.formatter.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            option:  {value: props.defaultValue._id, label: props.defaultValue.id}
        }
    }

    updateData() {
        if(this.props.defaultValue._id === this.state.option.value){
            this.props.onUpdate(null);
        }
        else{
            this.props.onUpdate({_id: this.state.option.value, id: this.state.option.label});
        }
    }

    onChange(option){
        this.setState({option: option})
    }

    formatter(){
        let options = [];
        for(let station in this.props.stations){
            options.push({value:station, label: this.props.stations[station].id})
        }
        return options;
    }

    render() {
        return (
            <div>
                <Select
                    placeholder="Station"
                    value={this.state.option}
                    options={this.formatter()}
                    onChange={this.onChange}
                />
                <button
                    className='btn-info btn-xs'
                    onClick={ this.updateData }>
                  save
                </button>
                <button
                    className='btn-info btn-xs'
                    onClick={ () =>this.props.onUpdate(null) }>
                  cancel
                </button>
            </div>
        );
    }
}

class CityEditor extends React.Component {
    constructor(props) {
        super(props);
        this.updateData = this.updateData.bind(this);
        this.formatter = this.formatter.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            option:  {value: props.defaultValue._id, label: props.defaultValue.city, state: props.defaultValue.state}
        }
    }

    updateData() {
        if(this.props.defaultValue._id === this.state.option.value){
            this.props.onUpdate(null);
        }
        else{
            this.props.onUpdate({_id: this.state.option.value, city: this.state.option.label, state: this.state.option.state});
        }
    }

    onChange(option){
        this.setState({option: option})
    }

    formatter(){
        let options = [];
        for(let key in this.props.cities){
            options.push({value:key, label: this.props.cities[key].city, state: this.props.cities[key].state});
        }
        return options;
    }

    render() {
        return (
            <div>
                <Select
                    placeholder="city"
                    value={this.state.option}
                    options={this.formatter()}
                    onChange={this.onChange}
                />
                <button
                    className='btn-info btn-xs'
                    onClick={ this.updateData }>
                    save
                </button>
                <button
                    className='btn-info btn-xs'
                    onClick={ () =>this.props.onUpdate(null) }>
                    cancel
                </button>
            </div>
        );
    }
}

export default Cameras;