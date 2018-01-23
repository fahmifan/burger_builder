import React from 'react';
import  { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavItems';
import NavItem from './NavigationItem/NavItem';

configure({adapter: new Adapter()})

describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render two navigation element if not authenticated', () => {
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });

  it('should render three navigation element if authenticated', () => {
    wrapper.setProps({isAuth: true})
    expect(wrapper.find(NavItem)).toHaveLength(3);
  });
});

