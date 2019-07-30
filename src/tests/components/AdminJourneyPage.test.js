import React from 'react';
import {shallow} from 'enzyme';
import AdminJourneyPage from '../../components/AdminJourneyPage';

 test('should render AdminJourneyPage correctly',() => {
  const wrapper = shallow(<AdminJourneyPage />);
  expect(wrapper).toMatchSnapshot(); 
  
 })