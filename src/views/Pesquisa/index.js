import React, {useState, useEffect} from 'react';
import {Card, CardHeader, CardBody, Button, Input, FormGroup, Form, Row, Col, Label} from 'reactstrap';
import 'react-dates/lib/css/_datepicker.css';
import Select from 'react-select';
import Multiselect from 'multiselect-react-dropdown';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import 'react-select/dist/react-select.min.css';
import Services from '../../Services';
import moment from 'moment'

const colors = [
    {key:"01", value:"AMARELA"},
    {key: "02", value: "AZUL"},
    {key: "03", value: "BEGE"},
    {key: "04", value: "BRANCA"},
    {key: "05", value: "CINZA"},
    {key: "06", value: "DOURADA"},
    {key: "07", value: "GRENA"},
    {key: "08", value: "LARANJA"},
    {key: "09", value: "MARROM"},
    {key: "10", value: "PRATA"},
    {key: "11", value: "PRETA"},
    {key: "12", value: "ROSA"},
    {key: "13", value: "ROXA"},
    {key: "14", value: "VERDE"},
    {key: "15", value: "VERMELHA"},
    {key: "16", value: "FANTASIA"},
];
const initialParams = {
    page: 1,
    sizePerPage: 25,
};



const Cameras = props => {
    const [value, setValue] = useState(moment().format('YYYY-MM-DD'));
    const [value1, setValue1] = useState(moment().format('YYYY-MM-DD'));
    const [startTime, setTime] = useState('00:00');
    const [endTime, setEnd] = useState('00:00');
    const [plate, setPlate] = useState('');
    const [excludePlate, setExcludePlate] = useState('');
    const [model, setModel] = useState('');
    const [brand, setBrand] = useState('');
    const [color, setColor] = useState('');
    const [colorName, setColorName] = useState('');
    const [originColor, setOriginColor] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startMoment, setStartMoment] = useState(null);
    const [endMoment, setEndMoment] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const [params, setParams] = useState(initialParams);
    const [dataTotalSize, setDataTotalSize] = useState(0);
    const [vehicles, setVehicles] = useState([]);

    const [cameras, setCameras] = useState([]);
    const [camera, setCamera] = useState(null);

    const [cities, setCities] = useState([]);
    const [citiesSelected, setCitySelected] = useState([]); 
    const [cameraSelected, setcamaraSelected] = useState([]); 


    useEffect(()=>{
        console.log('camera');
        Services.CameraService.fetchAll()
            .then(res =>{
               // console.log(res)
                if(res.success){
                    let cams;
                    console.log(citiesSelected)
                    if(citiesSelected!=''){
                        for(let i=0; i<citiesSelected.length;i++){
                            //console.log(citiesSelected[i].value)
                            cams = res.cameras.filter(element => element.city._id === citiesSelected[i].value);
                        }
                        
                    }
                        
                    else
                        cams = res.cameras;
                    let formatted = [];
                    for (let item of cams){
                        formatted.push({
                            value: item._id,
                            label: item.street,
                            id: item.cameraId
                        });
                    }
                   // console.log(formatted)
                    setCameras(formatted);
                    //setCamera(null);
                }else{
                    //toast.warn(res.errorMsg);
                }
            });
    }, [camera]); 
    const onChangeDate = e => {
        const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
        setValue(newDate);
        console.log(newDate); //value picked from date picker
      }

      const onChangeColor= e =>{
        setColor(e.target.value)
        //setColor(e.target.value)
        setColorName(e.target.selectedOptions[0].text)
      }


    const onChangeDate1 = e => {
        const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
        setValue1(newDate);
        console.log(newDate); //value picked from date picker
      }

      const selectCity =e =>{
       const res = cities.filter(el => {
            return e.find(element => {
               return element === el.label;
            });
         });
         console.log(res)
         setCitySelected(res)
      

      }

      const selectCamera =e =>{
        const res = cameras.filter(el => {
             return e.find(element => {
                return element === el.label;
             });
          });
         // console.log(res)
         setcamaraSelected(res)
       }



    useEffect(() =>{
        console.log('cities')
        Services.CityService.fetchAll()
            .then(res =>{
                if(res.success){
                    let cities = [];
                    for(let city of res.cities){
                        //console.log(city)
                        cities.push({
                            value: city._id,
                            label: `${city.city} - ${city.state}`
                        })
                    }
                    setCities(cities);
                }else{
                    //toast.warn(res.errorMsg);
                }
            });

            Services.CameraService.fetchAll()
            .then(res =>{
                if(res.success){
                    let cams;
                    console.log(citiesSelected)
                    if(citiesSelected!=''){
                        console.log('nhi h')
                        for(let i=0; i<citiesSelected.length;i++){
                            //console.log(citiesSelected[i].value)
                            cams = res.cameras.filter(element => element.city._id === citiesSelected[i].value);
                        }
                        
                    }
                        
                    else
                        cams = res.cameras;
                    let formatted = [];
                    for (let item of cams){
                        formatted.push({
                            value: item._id,
                            label: item.street,
                            id: item.cameraId
                        });
                    }
                    // console.log(formatted) 
                    setCameras(formatted);
                    //setCamera(null);
                }else{
                    //toast.warn(res.errorMsg);
                }
            });

    }, [citiesSelected]);

    //console.log(cities)
    const submit = () =>{
        let body = {...initialParams};
        body.plate = plate;
        body.model = model;
        body.excludePlate = excludePlate
        //body.brand = brand;
        body.color = color;
        body.originColor = originColor;
        body.startDate = value;
        body.startTime = startTime;
        body.endTime = endTime;
        body.startDate = value;
        body.endDate = value1;
        console.log('submit');
        console.log(citiesSelected);
        if(citiesSelected) body.citiesSelected = citiesSelected
        if(cameraSelected) body.camera = cameraSelected;
        Services.VehicleService.search1(body)
            .then(res => {
                if(res.success){
                    console.log(res)
                    setVehicles(res.vehicles);
                    setDataTotalSize(res.total);
                }else{
                    //toast.warn(res.errorMsg);
                }
            });
    };

    return (
        <div className="animated row">
            <Col md={12} sm={12} xs={12}>
                <Card>
                    <CardHeader>
                        <i className="icon-menu"/>Pesquisa
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <Label><strong>Procurar por</strong></Label>
                            <FormGroup>
                                <Input type="text"
                                       name="plate"
                                       id="plate"
                                       value={plate}
                                       placeholder="Placas"
                                       onChange={event => setPlate(event.target.value)}
                                       autoComplete="plate"/>
                            </FormGroup>
                            <Label><strong>Placa</strong></Label>
                            <FormGroup>
                                <Input type="text"
                                       name="plate"
                                       id="plate"
                                       value={excludePlate}
                                       placeholder="Excluded Licence Plate"
                                       onChange={event => setExcludePlate(event.target.value)}
                                       autoComplete="plate"/>
                            </FormGroup>
                              <Row>     
                                <Col md={3}>
                                <Label><strong>Data de inicio</strong></Label>
                                <FormGroup>
                                <Input type="date"
                                       name="model"
                                       id="model"
                                       placeholder="Start Date"
                                       autoComplete="model"
                                       value={value}
                                       onChange={onChangeDate}
                                       />
                            </FormGroup>
                                </Col>
                                <Col md={3}>
                                <Label><strong>Hora de inicio</strong></Label>
                                <FormGroup>
                                <Input type="time"
                                       name="model"
                                       id="model"
                                       placeholder="Start Time"
                                       autoComplete="model"
                                       min="00:00"
                                       max="23:59"
                                       value={startTime}
                                       onChange={ev => setTime(ev.target.value)}
                                       />
                            </FormGroup>
                                </Col>
                                <Col md={3}>
                                <Label><strong>Data Final </strong></Label>
                                <FormGroup>
                                <Input type="date"
                                       name="model"
                                       id="model"
                                       placeholder="End Date"
                                       autoComplete="model"
                                       value={value1}
                                       onChange={onChangeDate1}
                                       />
                            </FormGroup>
                                </Col>
                                <Col md={3}>
                                <Label><strong>Fim do tempo</strong></Label>
                                <FormGroup>
                                <Input type="time"
                                       name="model"
                                       id="model"
                                       min="00:00"
                                       max="23:59"
                                       placeholder="End Time"
                                       autoComplete="model"
                                       value={endTime}
                                       onChange={ev => setEnd(ev.target.value)}

                                       />
                            </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={4}>
                                <Label><strong>Modelo</strong></Label>
                                <FormGroup>
                                <Input type="text"
                                       name="model"
                                       id="model"
                                       value={model}
                                       onChange={event => setModel(event.target.value)}
                                       placeholder="Modelo"
                                       autoComplete="model"/>
                            </FormGroup>
                                </Col>
                                <Col md={4}>
                                <Label><strong>Qualquer cor </strong></Label>
                                <FormGroup>
                                <Input type="select"
                                       name="color"
                                       value={color}
                                       onChange={onChangeColor}
                                       id="color">
                                    <option value="">Qualquer cor</option>
                                    {
                                        colors.map(color => (<option value={color.key} key={color.key}>{color.value}</option>))
                                    }
                                </Input>
                            </FormGroup>
                                </Col>
                                <Col md={4}>
                                <Label><strong>Cor de origem</strong></Label>
                                <FormGroup>
                                <Input type="select"
                                       name="originColor"
                                       value={originColor}
                                       onChange={event => setOriginColor(event.target.value)}
                                       id="originColor">
                                    <option value="">Cor de origem</option>
                                    {
                                        colors.map(color => (<option value={color.key} key={color.key}>{color.value}</option>))
                                    }
                                </Input>
                            </FormGroup>
                                </Col>
                            </Row>       
                           <Row>
                            <Col md={6}>
                            <Label><strong>Cidade</strong></Label>
                            <FormGroup>
                            <Multiselect
                            options={cities.map(e=>e.label)} // Options to display in the dropdown
                            onSelect={(event)=>selectCity(event)} // Function will trigger on select event
                            onRemove={(event)=>{console.log(event)}}// Function will trigger on remove event
                            isObject={false}
                            
                            value={cities.map(e=>e.value)} 
                            />
                     
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <Label><strong>Camera</strong></Label>
                            <FormGroup>
                            <Multiselect
                                    options={cameras.map(e1=>e1.label)} 
                                    placeholder="Camera"
                                    isObject={false}
                                    style={{textAlign:'left'}}
                                    //onChange={setCamera}
                                    onSelect={(event)=>selectCamera(event)} // Function will trigger on select event
                                    onRemove={(event)=>{console.log(event)}}
                                />
                                
                            </FormGroup>
                            </Col>
                           </Row>
                            <FormGroup>
                            <Button
                                    type="button"
                                    color="primary"
                                    className="px-4"
                                    onClick={submit}
                                >Submit</Button>
                                &nbsp;&nbsp;
                                <Button
                                    type="button"
                                    color="warning"
                                    className="px-4"
                                   
                                >Clear</Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
            <Col md={12} sm={12} xs={12}>
            <Card>
                    <CardHeader>
                        <i className="icon-menu"/>
                        Resultados
                    </CardHeader>
                    <CardBody>
                        <p>Result Screen:</p>                                
                          <p>Research Report</p>
                        <ul>
                            <li> Number of vehicles found:<span className='mx-3'> {vehicles.length} </span></li>
                            </ul>
                      <ul className='d-inline-flex'>
                        <li className='pr-4 text-decoration-none text-truncate'>Start date: {value} Start time: {startTime}</li>
                        <li className=' text-decoration-none text-truncate'>End date: {value1} End time: {endTime}</li>
                        </ul> 
                       
                       <p>Cities :</p>
                    <p>(plate,{plate} make, model,{model} color,{colorName})</p> 
               <Row>  
               {(() => {  
            let td = [];
            if(vehicles){
                // console.log('yeess');
                // console.log(vehicles)
                for (let i = 0; i <vehicles.length; i++) {
                    var vehicle_image = vehicles[i].vehicleImg
                    var plateImg = vehicles[i].plateImg
                    console.log(vehicles[i].vehicleImg);
                    console.log(vehicles[i].plateImg);
                   //td.push(<Col key={i} md={3}><Card><img src={`http://storage.visionlpr.xyz:5050/vehicle/${vehicle_image}`} className='img-fluid'/><CardBody className="p-0"> <p className='p-3'><img src={`http://storage.visionlpr.xyz:5050/plate/${plateImg}`} className='img-fluid'/></p></CardBody></Card></Col>);
                    td.push(<Col key={i} md={3}><Card><img src={`http://storage.visionlpr.xyz:5050/vehicle/360002681_01_QHO0195_02-09-2022_16-34-58_04.jpg`} className='img-fluid'/><CardBody className="p-0"> <p className='p-3'><img src={`http://storage.visionlpr.xyz:5050/plate/360002681_01_QHO0195_02-09-2022_16-34-58.jpg`} className='img-fluid'/></p></CardBody></Card></Col>);
                }
                return td;
            }
       
          })()}  
                {/* <Col md={3}>
                <Card >
                        <img src="https://images.pexels.com/photos/12577819/pexels-photo-12577819.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" className='img-fluid'/>
                    <CardBody className="p-0">
                        <p className='p-3'>hello</p>
                    </CardBody>
            </Card>
                </Col> */}
               </Row>
                </CardBody>
                </Card>
            </Col>
 
        </div>
    );
};




export default Cameras;