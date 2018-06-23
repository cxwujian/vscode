import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Menu } from 'antd';

const noop = () => { };

/**
 * 菜单侧边栏 作为容器使用
 * 父容器高度须设置为100%
 */
class MenuHeader extends React.Component {
  render() {
    const { menuItems, menuClick } = this.props;
    const menuProps = {
      style: { borderBottom: 0, fontSize: 14 },
      mode: 'horizontal',
      defaultSelectedKeys: [menuItems.length > 0 ? menuItems[0].key : ''],
      onClick(item) { menuClick(item) },
    };
    return (
      <Menu {...menuProps}>
        {
          menuItems.map((item) => {
            return (
              <Menu.Item key={item.key}>
                <Link to={`${'/'}${item.to}`}>{item.text}</Link>
              </Menu.Item>
            )
          })
        }
      </Menu>
    );
  }
}

MenuHeader.propTypes = {
  menuItems: PropTypes.array,
  menuClick: PropTypes.func,
};

MenuHeader.defaultProps = {
  menuItems: [],
  menuClick: noop,
}

export default MenuHeader;
