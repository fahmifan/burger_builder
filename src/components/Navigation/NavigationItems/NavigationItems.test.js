import React from 'react';
import  { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavItems';
import NavItem from './NavigationItem/NavItem';

configure({adapter: new Adapter()})

describe('<NavigationItems />', () => {
  it('should render two navigation element if not authenticated', () => {
    const wrapper = shallow(<NavigationItems />);
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });
});

