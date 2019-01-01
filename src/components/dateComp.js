import React, { Component } from 'react';


class DateComp extends Component {
    constructor() {
        super()
        this.state = {
            datestate: ''

        }
    }


    date1 = (date) => {
        console.log(date);
        this.setState({
            datestate: date
        })
    }

    time1 = (time) => {
        let time1 = `${time}:00`

        let completed = this.state.datestate + " " + time1
        completed = completed.toString()
        let Date1 = new Date(completed)
    }
    render() {
        return (
            <div>
                <FormGroup>
                    <Label for="exampleDate">Date</Label>
                    <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" onChange={(value1) => this.date1(value1.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleTime">Time</Label>
                    <Input type="time" name="time" id="exampleTime" placeholder="time placeholder" onChange={(value1) => this.time1(value1.target.value)} />
                </FormGroup>
            </div>
        )
    }
}