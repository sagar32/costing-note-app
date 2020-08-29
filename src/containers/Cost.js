import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
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
                ...fields, weffWeight: weffWeight.toString(), worpWeight: worpWeight.toString(), resultRate1: resultRate1.toString(),
                resultRate2: resultRate2.toString(), totalweight: totalweight.toString(), totalrate: totalrate.toString()
            });
            localStorage.setItem('storedRecords', JSON.stringify(storedRecords));

            setIsLoading(false)

        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }

    return (
        <div className="Login">
            <form className="form" onSubmit={handleSubmit}>

                <FormGroup controlId="name" bsSize="large">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        autoFocus="true"
                        type="text"
                        value={fields.name}
                        onChange={handleFieldChange}
                    />
                </FormGroup>

                <FormGroup controlId="tar" bsSize="large">
                    <ControlLabel>Tar</ControlLabel>
                    <FormControl
                        autoFocus
                        type="number"
                        value={fields.tar}
                        onChange={handleFieldChange}
                    />
                </FormGroup>

                <FormGroup controlId="denier1" bsSize="large">
                    <ControlLabel>Denier1</ControlLabel>
                    <FormControl
                        autoFocus
                        type="number"
                        value={fields.denier1}
                        onChange={handleFieldChange}
                    />
                </FormGroup>

                <FormGroup controlId="pick" bsSize="large">
                    <ControlLabel>Pick</ControlLabel>
                    <FormControl
                        autoFocus
                        type="number"
                        value={fields.pick}
                        onChange={handleFieldChange}
                    />
                </FormGroup>

                <FormGroup controlId="panno" bsSize="large">
                    <ControlLabel>Panno</ControlLabel>
                    <FormControl
                        autoFocus
                        type="number"
                        value={fields.panno}
                        onChange={handleFieldChange}
                    />
                </FormGroup>

                <FormGroup controlId="denier2" bsSize="large">
                    <ControlLabel>Denier2</ControlLabel>
                    <FormControl
                        autoFocus
                        type="number"
                        value={fields.denier2}
                        onChange={handleFieldChange}
                    />
                </FormGroup>

                <FormGroup controlId="rate1" bsSize="large">
                    <ControlLabel>Rate1</ControlLabel>
                    <FormControl
                        autoFocus
                        type="number"
                        value={fields.rate1}
                        onChange={handleFieldChange}
                    />
                </FormGroup>

                <FormGroup controlId="rate2" bsSize="large">
                    <ControlLabel>Rate2</ControlLabel>
                    <FormControl
                        autoFocus
                        type="number"
                        value={fields.rate2}
                        onChange={handleFieldChange}
                    />
                </FormGroup>

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

                <br />
                <ControlLabel>Worp Weight = {worpWeight}</ControlLabel>
                <br />
                <ControlLabel>Weff Weight = {weffWeight}</ControlLabel>
                <br />
                <ControlLabel>Rate 1 = {resultRate1}</ControlLabel>
                <br />
                <ControlLabel>Rate 2 = {resultRate2}</ControlLabel>
                <br />
                <ControlLabel>Total Weight = {totalweight}</ControlLabel>
                <br />
                <ControlLabel>Total Rate = {totalrate}</ControlLabel>
            </form>
        </div>
    );
}