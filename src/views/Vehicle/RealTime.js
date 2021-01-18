import React, {useState, useEffect} from 'react';
import {Card, CardHeader, CardBody, Row, Col, FormGroup, Input, Label} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {io} from 'socket.io-client';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import {toast} from 'react-toastify';
import Services from '../../Services';

const initialParams = {
    page: 1,
    sizePerPage: 10,
    sort:{
        cameraId: 'desc'
    },
    filterObj:{
        alert:[],
        range: null
    }
};

const alertTypes = {
    1: 'Roubo',
    2: 'Licenciamento',
    3: 'Renajud',
    4: 'Envolvido na ocorrência',
    5: 'Investigado'
};

const colors = {
    "01":"AMARELA",
    "02": "AZUL",
    "03": "BEGE",
    "04": "BRANCA",
    "05": "CINZA",
    "06": "DOURADA",
    "07": "GRENA",
    "08": "LARANJA",
    "09": "MARROM",
    "10": "PRATA",
    "11": "PRETA",
    "12": "ROSA",
    "13": "ROXA",
    "14": "VERDE",
    "15": "VERMELHA",
    "16": "FANTASIA"
};

const RealTime = props => {

    const [vehicles, setVehicles] = useState([]);
    const [vehicle, setVehicle] = useState({});
    const [cameras, setCameras] = useState([]);

    const [dataTotalSize, setDataTotalSize] = useState(0);
    const [params, setParams] = useState(initialParams);

    const socketHandler = (data) =>{
        if(params.filterObj.alert.length < 1 || params.filterObj.alert.indexOf(data.alert) !== -1){
            setVehicles(prev => [data, ...prev]);
            setDataTotalSize(prev => prev + 1);
        }
    };

    useEffect(() =>{
        const socket = io('http://localhost:5000',{
            enableLogging: true,
            upgrade: false
        });

        Services.CameraService.fetch()
            .then(res =>{
                if(res.success){
                    setCameras(res.cameras);
                }else{
                    toast.warn(res.errorMsg);
                }
            });

            socket.on("vehicle", socketHandler);

            return () => {socket.disconnect();}
    }, []);

    useEffect(() =>{
        if(cameras.length > 0)
            Services.VehicleService.fetchAlert(params)
            .then(res =>{
                if(res.success){
                    setVehicles(res.vehicles);
                    setDataTotalSize(res.total);
                }else{
                    toast.warn(res.errorMsg);
                }
            });
    }, [params, cameras]);

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

    const onFilterChange = filterObj =>{
        let tmp = {...params};
        let filter = tmp.filterObj;
        if(filterObj.key === 'range'){
            filter.range = filterObj.value;
        }else if(filterObj.key === 'type'){
            filterObj.value
                ?filter.alert.push(filterObj.type)
                :filter.alert = filter.alert.filter(element => element !== filterObj.type);
        }
        tmp.filterObj = filter;
        setParams(tmp);
    };

    const alertFormatter = alert =>{
        return alertTypes[alert];
    };

    const colorFormatter = color =>{
        return colors[color];
    };

    const dateFormatter = datetime =>{
        let options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false
        };
        let date = new Date(Date.parse(datetime));
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    const cameraFormatter = (a, b) =>{
        let camera = cameras.filter(element => element.cameraId === a && element.station.id === b.station);
        return camera[0].street;
    };

    const onRangeChange = event =>{
        onFilterChange({key: 'range', value: parseInt(event.target.value)});
    };

    const onTypeChange = event =>{
        onFilterChange({key: 'type', type: parseInt(event.target.value), value: event.target.checked});
    };

    const onHover = (row, event) =>{
        let elem = event.target;
        if(elem.tagName === 'TD'){
            setVehicle(row);
        }
    };

    const options ={
        searchDelayTime: 1500,
        sortIndicator: true,
        page: params.page,
        sizePerPage: params.sizePerPage,
        hideSizePerPage: false,
        paginationSize: 5,
        hidePageListOnlyOnePage: false,
        alwaysShowAllBtns: false,
        withFirstAndLast: false,
        onPageChange: onPageChange,
        onSizePerPageList: onSizePerPageList,
        onSortChange: onSortChange,
        noDataText: "Não há dados",
        onRowMouseOver: onHover,
    };

    return (
        <div className="animated">
            <Card>
                <CardHeader>
                    <i className="icon-menu"/>Tempo Real
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <Label><h5>Selecione os alertas</h5></Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <FormGroup check inline>
                                    <Input className="form-check-input" type="checkbox" id="alert1" name="alert1" value="1" onChange={onTypeChange}/>
                                    <Label className="form-check-label" check htmlFor="inline-checkbox1">Roubo</Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Input className="form-check-input" type="checkbox" id="alert2" name="alert2" value="2" onChange={onTypeChange} />
                                    <Label className="form-check-label" check htmlFor="inline-checkbox2">Licenciamento</Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Input className="form-check-input" type="checkbox" id="alert3" name="alert3" value="3" onChange={onTypeChange}/>
                                    <Label className="form-check-label" check htmlFor="inline-checkbox3">Renajud</Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Input className="form-check-input" type="checkbox" id="alert4" name="alert4" value="4" onChange={onTypeChange}/>
                                    <Label className="form-check-label" check htmlFor="inline-checkbox3">Envolvido na ocorrência</Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Input className="form-check-input" type="checkbox" id="alert5" name="alert5" value="5" onChange={onTypeChange}/>
                                    <Label className="form-check-label" check htmlFor="inline-checkbox3">Investigado</Label>
                                </FormGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Selecione o último período</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <FormGroup check inline>
                                    <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="1" onChange={onRangeChange}/>
                                    <Label className="form-check-label" check htmlFor="inline-radio1">24 horas</Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="2" onChange={onRangeChange}/>
                                    <Label className="form-check-label" check htmlFor="inline-radio2">48 horas</Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Input className="form-check-input" type="radio" id="inline-radio3" name="inline-radios" value="3" onChange={onRangeChange}/>
                                    <Label className="form-check-label" check htmlFor="inline-radio3">72 horas</Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Input className="form-check-input" type="radio" id="inline-radio4" name="inline-radios" value="7" onChange={onRangeChange}/>
                                    <Label className="form-check-label" check htmlFor="inline-radio4">Semana</Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Input className="form-check-input" type="radio" id="inline-radio5" name="inline-radios" value="30" onChange={onRangeChange}/>
                                    <Label className="form-check-label" check htmlFor="inline-radio5">Mês</Label>
                                </FormGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2>
                                {dataTotalSize} Resultados
                            </h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <BootstrapTable
                                remote={true}
                                data={vehicles}
                                version="4"
                                striped
                                pagination={true}
                                fetchInfo={{dataTotalSize: dataTotalSize}}
                                options={options}>

                                <TableHeaderColumn dataField="license" dataSort editable={false} width="100">Placa</TableHeaderColumn>
                                <TableHeaderColumn dataField="createdAt" dataSort editable={false} width="150" dataFormat={dateFormatter}>Lido em: </TableHeaderColumn>
                                <TableHeaderColumn dataField='camera' dataSort width="200" editable={false} dataFormat={cameraFormatter}>Câmera</TableHeaderColumn>
                                <TableHeaderColumn dataField='model' dataSort editable={false} width="250">Marca/Modelo</TableHeaderColumn>
                                <TableHeaderColumn dataField='color' dataSort editable={false}
                                                   dataFormat={colorFormatter}
                                                   width="100">Cor</TableHeaderColumn>
                                <TableHeaderColumn dataField='alert' dataSort
                                                   dataFormat={alertFormatter}
                                                   width="100" editable={false}>Tipo de Alerta</TableHeaderColumn>
                                <TableHeaderColumn dataField='_id' hidden isKey={true}>Açao</TableHeaderColumn>
                            </BootstrapTable>
                        </Col>
                        <Col lg="4">
                            <Card className='bg-secondary'>
                                <CardBody style={{minHeight: '400px'}}>
                                    {
                                        Object.keys(vehicle).length > 0 &&
                                            <React.Fragment>
                                                <Row>
                                                    <Col style={{padding: '10px'}}>
                                                        <img
                                                            style={{maxWidth: '150px'}}
                                                            src={`${process.env.REACT_APP_STORAGE_URL}/plate/${vehicle.plateImg}`}
                                                            alt="Imagem da placa"/>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col style={{padding: '10px'}}>
                                                        <img
                                                            style={{maxWidth: '300px'}}
                                                            src={`${process.env.REACT_APP_STORAGE_URL}/vehicle/${vehicle.vehicleImg}`}
                                                            alt="Imagem da placa"/>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <div>Placa: <strong>{vehicle.license}</strong></div>
                                                        <div>Marca: <strong>{vehicle.model}</strong></div>
                                                        <div>Proprietário: <strong>{vehicle.owner}</strong></div>
                                                        <div>Renavam: <strong>{vehicle.renavam}</strong></div>
                                                        <div>Link Consulta: <a
                                                            href={`https://consultas.detrannet.sc.gov.br/servicos/consultaveiculo.asp?placa=${vehicle.license}&renavam=${vehicle.renavam}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer">https://consultas.detrannet.sc.gov.br/servicos/consultaveiculo.asp?placa={vehicle.license}&renavam={vehicle.renavam}</a></div>
                                                    </Col>
                                                </Row>
                                            </React.Fragment>
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

        </div>
    );
};

export default RealTime;