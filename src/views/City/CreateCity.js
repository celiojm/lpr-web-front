import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Col,
    Row,
    Form,
    FormFeedback,
    FormGroup,
    Input
} from 'reactstrap';
import {toast} from 'react-toastify';
import Services from '../../Services';


const validationSchema = function (values) {
    return Yup.object().shape({
        city: Yup.string()
            .min(4, `City has to be at least 2 characters`)
            .required('City is required'),
        state: Yup.string()
            .required('State is required'),
    })
};

const validate = (getValidationSchema) => {
    return (values) => {
        const validationSchema = getValidationSchema(values);
        try {
            validationSchema.validateSync(values, { abortEarly: false });
            return {}
        } catch (error) {
            return getErrorsFromValidationError(error)
        }
    }
};

const getErrorsFromValidationError = (validationError) => {
    const FIRST_ERROR = 0;
    return validationError.inner.reduce((errors, error) => {
        return {
            ...errors,
            [error.path]: error.errors[FIRST_ERROR],
        }
    }, {})
};

const initialValues = {
    city: "",
    state: "",
};


const  CreateCity = props => {

    const onSubmit = async (values, { setSubmitting, setErrors })  =>{
        Services.CityService.create(values)
            .then(res =>{
                if(res.success){
                    toast.success("Success!");
                    props.history.replace('/city/all');
                }else {
                   setErrors({state: res.errorMsg});
                   toast.warn(res.errorMsg);
                }
            });
        setSubmitting(false)
    };

    return (
        <div className="animated fadeIn">
            <Row>
                <Col md={4}/>
                <Col md={4} className="text-center">
                    <Card>
                        <CardHeader>
                            <i className="icon-map"/><strong>Add City</strong>
                        </CardHeader>
                        <CardBody>
                            <hr />
                            <Formik
                                initialValues={initialValues}
                                validate={validate(validationSchema)}
                                onSubmit={onSubmit}
                                render={
                                    ({
                                         values,
                                         errors,
                                         touched,
                                         status,
                                         dirty,
                                         handleChange,
                                         handleBlur,
                                         handleSubmit,
                                         isSubmitting,
                                         isValid,
                                     }) => (
                                        <Row>
                                            <Col>
                                                <Form onSubmit={handleSubmit} noValidate name='simpleForm'>
                                                    <FormGroup>
                                                        <Input type="text"
                                                               name="city"
                                                               id="city"
                                                               placeholder="City"
                                                               autoComplete="city"
                                                               valid={!errors.city}
                                                               invalid={touched.city && !!errors.city}
                                                               required
                                                               onChange={handleChange}
                                                               onBlur={handleBlur}
                                                               value={values.city} />
                                                        <FormFeedback>{errors.city}</FormFeedback>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Input type="text"
                                                               name="state"
                                                               id="state"
                                                               placeholder="State"
                                                               autoComplete="state"
                                                               valid={!errors.state}
                                                               invalid={touched.state && !!errors.state}
                                                               required
                                                               onChange={handleChange}
                                                               onBlur={handleBlur}
                                                               value={values.state} />
                                                        <FormFeedback>{errors.state}</FormFeedback>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Button type="submit" color="primary" className="mr-1" disabled={isSubmitting || !isValid}>{isSubmitting ? 'Wait...' : 'Create'}</Button>
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                        </Row>
                                    )} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );

};

export default CreateCity;