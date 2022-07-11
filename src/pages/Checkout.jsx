import React from 'react';
import Input from '../Components/Input';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
    };
  }

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value })

  render() {
    const { fullName, email, cpf, cep, phone, address } = this.state;
    return (
      <>
        <Input
          type="text"
          dataTestId="checkout-fullname"
          name="fullName"
          value={ fullName }
          onChange={ (evt) => this.handleChange(evt) }
        >
          Nome completo:
        </Input>
        <Input
          type="email"
          dataTestId="checkout-email"
          name="email"
          value={ email }
          onChange={ (evt) => this.handleChange(evt) }
        >
          Email:
        </Input>
        <Input
          type="text"
          dataTestId="checkout-cpf"
          name="cpf"
          value={ cpf }
          onChange={ (evt) => this.handleChange(evt) }
        >
          CPF:
        </Input>
        <Input
          type="text"
          dataTestId="checkout-phone"
          name="phone"
          value={ phone }
          onChange={ (evt) => this.handleChange(evt) }
        >
          phone:
        </Input>
        <Input
          type="text"
          dataTestId="checkout-cep"
          name="cep"
          value={ cep }
          onChange={ (evt) => this.handleChange(evt) }
        >
          CEP:
        </Input>
        <Input
          type="text"
          dataTestId="checkout-address"
          name="address"
          value={ address }
          onChange={ (evt) => this.handleChange(evt) }
        >
          address:
        </Input>
      </>
    );
  }
}

export default Checkout;
