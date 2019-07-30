import React from 'react';
import {shallow} from 'enzyme';
import AdminDashboardPage from '../../components/AdminDashboardPage';

 test('should render AdminDashboardPage correctly',() => {
  const wrapper = shallow(<AdminDashboardPage />);
  expect(wrapper).toMatchSnapshot(); 
  
 })