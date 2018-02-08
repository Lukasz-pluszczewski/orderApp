import React, { Component } from 'react';
import _ from 'lodash';

import Input from 'components/Input';
import Button from 'components/Button';

import 'styles/pages/OrderPage.scss';

export default class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      newElementPerson: '',
      newElementName: '',
      newElementPrice: '',
      json: '',
      discount: '',
      delivery: ''
    };
    this.addJson = this.addJson.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderGrouped = this.renderGrouped.bind(this);
    this.getPersons = this.getPersons.bind(this);
    this.getNames = this.getNames.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.getCorrection = this.getCorrection.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('orderList')) {
      this.setState({ elements: JSON.parse(localStorage.getItem('orderList')) });
    }
  }

  // setting values in state
  addJson() {
    this.setState({ elements: JSON.parse(this.state.json) });
  }
  add() {
    this.setState(
      {
        elements: [
          ...this.state.elements,
          {
            person: this.state.newElementPerson,
            name: this.state.newElementName,
            price: this.state.newElementPrice,
          }
        ],
        newElementName: '',
        newElementPrice: '',
      },
      () => localStorage.setItem('orderList', JSON.stringify(this.state.elements))
    );
    this.personRef.focus();
  }
  remove(index) {
    const arr = this.state.elements;
    arr.splice(index, 1);
    this.setState({ elements: arr }, () => localStorage.setItem('orderList', JSON.stringify(this.state.elements)));
  }
  resetInputs() {
    this.setState({
      newElementPerson: '',
      newElementName: '',
      newElementPrice: '',
    });
    this.personRef.focus();
  }

  // utils
  handleKeyDown(onEnter = () => {}, cb = () => {}) {
    return e => {
      if (e.key === 'Escape') {
        return this.resetInputs();
      }
      if (e.key === 'Enter') {
        onEnter();
      }
      cb();
    };
  }
  getCorrection() {
    return parseFloat(this.state.delivery || 0) - parseFloat(this.state.discount || 0);
  }
  getSum(elements) {
    return elements.reduce((sum, el) => sum + (parseFloat(el.price.replace(',', '.'))), 0) - this.getCorrection();
  }
  formatCurrency(value, currency = 'zł') {
    return `${parseFloat(value).toFixed(2)}${currency}`;
  }
  getPersons() {
    return _.keys(_.groupBy(this.state.elements, 'person'));
  }
  getNames() {
    return _.keys(_.groupBy(this.state.elements, 'name'));
  }
  getPrice(name) {
    return _.keys(_.groupBy(_.filter(this.state.elements, { name }), 'price'));
  }

  // renderers
  renderField(fieldName) {
    switch(fieldName) {
      case 'person':
        return value => (<span key="person" className="Order__itemField Order__personItem">{value}</span>);
      case 'name':
        return value => (<span key="name" className="Order__itemField Order__nameItem">{value}</span>);
      case 'price':
        return value => (<span key="price" className="Order__itemField Order__priceItem">{this.formatCurrency(value)}</span>);
      default:
        return value => value;
    }
  }

  renderItem(fields, button = true) {
    return (el, index) => {
      if (fields) {
        el = _.pick(el, fields);
      }
      return (<div className="Order__item" key={index}>
        {button ? <Button onClick={() => this.remove(index)}>x</Button> : null}
        {_.map(el, (field, fieldName) => this.renderField(fieldName)(field))}
      </div>);
    };
  }

  renderGrouped(elements, by, fields = ['person', 'name', 'price'], button = true) {
    let correction = by === 'person' ? this.getCorrection() : 0;
    correction = correction / (_.size(_.groupBy(elements, by)));

    return _.map(_.groupBy(elements, by), (group, groupName) => (
      <div key={groupName} className="Order__group">
        <div>
          <b>{groupName}</b>
          {`: (${group.length}) ${this.formatCurrency(this.getSum(group))}`}
          {correction ? ` -> ${this.formatCurrency(this.getSum(group) + correction)}` : null}
        </div>
        <div>
          {group.map(this.renderItem(fields, button))}
        </div>
      </div>
    ));
  }

  render() {
    return <div className="Order">
      <div className="Order__section">
        <div>
          <textarea value={this.state.json} onChange={e => this.setState({ json: e.target.value })} />
        </div>
        <Button onClick={this.addJson}>Parse</Button>
      </div>
      <div className="Order__section">
        <Input
          value={this.state.discount}
          onChange={e => this.setState({ discount: e.target.value })}
          label="Discount"
        />
        <Input
          value={this.state.delivery}
          onChange={e => this.setState({ delivery: e.target.value })}
          label="Delivery"
        />
      </div>
      <div className="Order__section">
        <h3>Enter order:</h3>
        <Input
          ref={person => this.personRef = person}
          value={this.state.newElementPerson}
          onChange={e => this.setState({ newElementPerson: e.target.value })}
          onKeyDown={this.handleKeyDown(() => this.nameRef.focus())}
          options={this.getPersons()}
          label="Person"
        />
        <Input
          ref={name => this.nameRef = name}
          value={this.state.newElementName}
          onChange={e => this.setState({ newElementName: e.target.value })}
          onKeyDown={this.handleKeyDown(() => this.priceRef.focus(), () => {
            const foundPrices = this.getPrice(this.state.newElementName);
            if (foundPrices.length === 1) {
              this.setState({ newElementPrice: foundPrices[0] });
            }
          })}
          options={this.getNames()}
          label="Name"
        />
        <Input
          ref={price => this.priceRef = price}
          value={this.state.newElementPrice}
          onChange={e => this.setState({ newElementPrice: e.target.value })}
          onKeyDown={this.handleKeyDown(this.add)}
          options={this.getPrice(this.state.newElementName)}
          label="Price"
        />
        <Button onClick={this.add}>Add</Button>
      </div>
      <div className="Order__section">
        <h3>Added items:</h3>
        {this.state.elements.map(this.renderItem())}
      </div>
      <div className="Order__section">
        <h3>Sum:</h3>
        {this.formatCurrency(this.getSum(this.state.elements))}
      </div>
      <div className="Order__section">
        <h3>By product:</h3>
        {this.renderGrouped(this.state.elements, 'name', ['person', 'price'], false)}
      </div>
      <div className="Order__section">
        <h3>By person:</h3>
        {this.renderGrouped(this.state.elements, 'person', ['name', 'price'], false)}
      </div>
      <hr/>
      <pre>{JSON.stringify(this.state.elements, null, 2)}</pre>
    </div>;
  }
}
