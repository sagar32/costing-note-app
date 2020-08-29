import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel, Row,Col } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import LoaderButton from "../components/LoaderButton";



export default function Cost() {

    const [fields, handleFieldChange] = useFormFields({
        name: "",
        tar: "",
        denier1: "",
        pick: "",
        panno: "",
        denier2: "",
        rate1: "",
        rate2: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [weffWeight, setWeffWeight] = useState(0);
    const [worpWeight, setWorpWeight] = useState(0);
    const [resultRate1, setResultRate1] = useState(0);
    const [resultRate2, setResultRate2] = useState(0);
    const [storedRecords, setStoredRecords] = useState(JSON.parse(localStorage.getItem('storedRecords')) || []);
    const [totalweight, setTotalWeight] = useState(0);
    
    
    const [totalrate, setTotalRate] = useState(0);

    function validateForm() {
        return fields.name.length > 0
            && fields.tar > 0
            && fields.denier1 > 0
            && fields.pick > 0
            && fields.panno > 0
            && fields.denier2 > 0
            && fields.rate1 > 0
            && fields.rate2 > 0
            ;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            console.log("fields:", fields);

            let wow = (fields.tar * fields.denier1 * 110) / 9000000;
            setWorpWeight(wow);

            let wew = (fields.pick * fields.panno * fields.denier2 * 110) / 9000000;
            setWeffWeight(wew);

            let r1 = (wow * fields.rate1) / 100;
            setResultRate1(r1);

            let r2 = (wew * fields.rate2) / 100;
            setResultRate2(r2);
            
            let tw = (wow + wew);
            setTotalWeight(tw);

            let tr = (r1 + r2);
            setTotalRate(tr);
            
            
            storedRecords.push({
                ...fields, weffWeight: wew.toString(), worpWeight: wow.toString(), resultRate1: r1.toString(),
                resultRate2: r2.toString(), totalweight: tw.toString(), totalrate: tr.toString()
            });
            localStorage.setItem('storedRecords', JSON.stringify(storedRecords));
            setStoredRecords(storedRecords.reverse())
            setIsLoading(false)

        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }

    return (
        <div className="padded-div">
            <form className="form" className="form-box" onSubmit={handleSubmit}>
                <Row md={6} lg={6} xs={6} sm={6}> 
                    <Col  md={6} lg={6} xs={6} sm={6}>
                        <FormGroup controlId="name" bsSize="large">
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                autoFocus="true"
                                type="text"
                                value={fields.name}
                                onChange={handleFieldChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col  md={6} lg={6} xs={6} sm={6}>
                        <FormGroup controlId="tar" bsSize="large">
                            <ControlLabel>Tar</ControlLabel>
                            <FormControl
                                autoFocus
                                type="number"
                                value={fields.tar}
                                onChange={handleFieldChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col  md={6} lg={6} xs={6} sm={6}>
                        <FormGroup controlId="denier1" bsSize="large">
                            <ControlLabel>Denier1</ControlLabel>
                            <FormControl
                                autoFocus
                                type="number"
                                value={fields.denier1}
                                onChange={handleFieldChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col  md={6} lg={6} xs={6} sm={6}>
                        <FormGroup controlId="pick" bsSize="large">
                            <ControlLabel>Pick</ControlLabel>
                            <FormControl
                                autoFocus
                                type="number"
                                value={fields.pick}
                                onChange={handleFieldChange}
                            />
                        </FormGroup>
                    </Col>
                    
                    <Col  md={6} lg={6} xs={6} sm={6}>
                        <FormGroup controlId="panno" bsSize="large">
                            <ControlLabel>Panno</ControlLabel>
                            <FormControl
                                autoFocus
                                type="number"
                                value={fields.panno}
                                onChange={handleFieldChange}
                            />
                        </FormGroup>
                    </Col>

                    <Col  md={6} lg={6} xs={6} sm={6}>
                        <FormGroup controlId="denier2" bsSize="large">
                            <ControlLabel>Denier2</ControlLabel>
                            <FormControl
                                autoFocus
                                type="number"
                                value={fields.denier2}
                                onChange={handleFieldChange}
                            />
                        </FormGroup>
                    </Col>

                    <Col  md={6} lg={6} xs={6} sm={6}>
                        <FormGroup controlId="rate1" bsSize="large">
                            <ControlLabel>Rate1</ControlLabel>
                            <FormControl
                                autoFocus
                                type="number"
                                value={fields.rate1}
                                onChange={handleFieldChange}
                            />
                        </FormGroup>
                    </Col>

                    <Col  md={6} lg={6} xs={6} sm={6}>
                        <FormGroup controlId="rate2" bsSize="large">
                            <ControlLabel>Rate2</ControlLabel>
                            <FormControl
                                autoFocus
                                type="number"
                                value={fields.rate2}
                                onChange={handleFieldChange}
                            />
                        </FormGroup>
                    </Col>

                </Row>


                <br />
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Count
               </LoaderButton>
                <div className="result-box">
                    <Row>
                        <Col md={6} lg={6} xs={6} sm={6}>
                            <FormGroup>
                                <ControlLabel>
                                    Worp Weight
                                </ControlLabel>
                                <span>
                                    {worpWeight.toFixed(4)}
                                </span>
                            </FormGroup>
                        </Col>
                        <Col md={6} lg={6} xs={6} sm={6}>
                            <FormGroup>
                                <ControlLabel>Weff Weight</ControlLabel>
                                <span>
                                {weffWeight.toFixed(4)}
                                </span>
                            </FormGroup>
                        </Col>
                        <Col md={6} lg={6} xs={6} sm={6}>
                            <FormGroup>
                                <ControlLabel>Rate 1 </ControlLabel>
                                <span>{resultRate1.toFixed(4)}</span>
                            </FormGroup>
                        </Col>
                        <Col md={6} lg={6} xs={6} sm={6}>
                            <FormGroup>
                               <ControlLabel>Rate 2</ControlLabel>
                                <span>{resultRate2.toFixed(4)}</span>
                            </FormGroup>
                        </Col>
                        <Col md={6} lg={6} xs={6} sm={6}>
                            <FormGroup>
                                <ControlLabel>Total Weight </ControlLabel>
                                <span>{totalweight.toFixed(4)}</span>
 
                            </FormGroup>
                        </Col>
                        <Col md={6} lg={6} xs={6} sm={6}>
                            <FormGroup>
                                <ControlLabel>Total Rate</ControlLabel>
                                <span>{totalrate.toFixed(4)}</span>
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    
                    
                    
                    
                </div>
                {
                    storedRecords &&storedRecords.length>0&&
                
                <table className="table table-dark table-sm table-small compact">
                    <thead>
                        <th>
                            Name
                        </th>
                        <th>Tar</th>
                        <th>D1</th>
                        <th>D2</th>
                        <th>Pick</th>
                        <th>Panno</th>
                        <th>R 1</th>
                        <th>R 2</th>
                        <th>Worp We.</th>
                        <th>Weff We.</th>
                        <th>Re. R 1</th>
                        <th>Re. R 2</th>
                        <th>To. We.</th>
                        <th>To. Rt.</th>
                    </thead>
                    <tbody>
                        {
                            storedRecords &&storedRecords.length>0&& storedRecords.map((record)=>{
                                return (
                                    <tr>
                                        <td>
                                            {
                                                record.name
                                            }
                                        </td>
                                        <td>{ record.tar }</td>
                                        <td>{ record.denier1 }</td>
                                        <td>{ record.denier2 }</td>
                                        <td>{ record.pick }</td>
                                        <td>{ record.panno }</td>
                                        <td>{ record.rate1 }</td>
                                        <td>{ record.rate2 }</td>
                                        <td>{ parseInt(record.worpWeight).toFixed(4) }</td>
                                        <td>{ parseInt(record.weffWeight).toFixed(4) }</td>
                                        <td>{parseInt( record.resultRate1).toFixed(4) }</td>
                                        <td>{ parseInt(record.resultRate2).toFixed(4) }</td>
                                        <td>{ parseInt(record.totalweight).toFixed(4) }</td>
                                        <td>{parseInt( record.totalrate).toFixed(4) }</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                }
            </form>
        </div>
    );
}