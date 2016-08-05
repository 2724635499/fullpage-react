const React = require('react');
const Tappable = require('react-tappable');

const events = require('../utils/events');

class sideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      side: this.props.side === 'right' ? 'right' : 'left'
    };

    this.goToSlide = this.goToSlide.bind(this);
  }

  goToSlide(slide) {
    events.pub('Fullpage', slide);
  }

  render() {
    let styles = {
      position: 'fixed',
      zIndex: '1',
      cursor: 'pointer',

      //defaults
      top: '50%',
      left: '1%'
    };

    if (this.props.top) {
      styles.top = this.props.top;
    }

    if (this.props.right) {
      styles.right = this.props.right;
      delete styles.left;
    } else {
      styles.left = this.props.left || styles.left;
    }

    return (
      <div style={styles}>
        {this.props.children.map((child, idx) => {
          return (
            <Tappable key={idx} onTap={this.goToSlide.bind(this, child.ref)} onClick={this.goToSlide.bind(this, child.ref)}>{child}</Tappable>
          )
        }, this)}
      </div>
    );
  }
};

module.exports = sideNav;