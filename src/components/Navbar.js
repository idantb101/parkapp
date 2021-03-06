import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFilterToggled: false,
      isShowByToggled: false
    };
    this.FilterToggled = this.FilterToggled.bind(this);
    this.ShowByToggled = this.ShowByToggled.bind(this);
  }

  FilterToggled = e => {
    this.state.isFilterToggled === true
      ? this.setState({ isFilterToggled: false })
      : this.setState({ isFilterToggled: true });
  };
  ShowByToggled = e => {
    this.state.isShowByToggled === true
      ? this.setState({ isShowByToggled: false })
      : this.setState({ isShowByToggled: true });
  };

  render() {
    return (
      <div>
        <nav className="navbar1 h2 flex justify-between w-100 bg-park-blue bb b--white changa f4 h3-ns">
          <form
            className="form w-50 pa0 bg-white ba b--white dt h2"
            action="TBC"
            onSubmit={this.props.handleSubmit}
          >
            <input
              className="w-80 ma0 h2 mh0 f5 h3-ns dtc v-mid bn"
              type="text"
              name="searchInput"
              placeholder="                        ابحث"
            />
            <button
              className="button w-20 ma0 h1 bg-white bn h3-ns dtc v-mid"
              type="submit"
            >
              <i className="fas fa-search pointer bn" />
            </button>
          </form>
          <div className="w-50 pt1 tc pt22-ns br b--white">
            <a href="/" className="white no-underline f2-ns">
              منتزهات وطنيه
            </a>
          </div>
        </nav>

        <nav
          className={
            this.props.location === '/map' ||
            this.props.location.includes('parkFullDetails')
              ? 'dn'
              : 'navbar2 h2 flex justify-between w-100 bg-park-blue changa f4 h3-ns f2-ns'
          }
        >
          <div className="w-30 pt1 tc pt22-ns">
            <a href="/map" className="white no-underline">
              خريطة
            </a>
          </div>
          <div className="showby w-40 bl br b--white tc z-1 pt2-ns">
            <button
              onClick={this.FilterToggled}
              className="dropbtn white bg-park-blue changa pt1 bn"
            >
              فلتر
            </button>
            <div
              className={
                this.state.isFilterToggled === true
                  ? 'flex dropdown-content flex-column tl'
                  : 'dn dropdown-content flex-column tl'
              }
            >
              <a
                href=""
                className="black no-underline mt1 pa1 ba b--black-20 pl3 bg-white"
                onClick={event => {
                  event.preventDefault();
                  this.props.filterByTag('شلالات');
                }}
              >
                شلالات
              </a>
              <a
                href=""
                className="black no-underline pa1 bl br bb b--black-20 pl3 bg-white"
                onClick={event => {
                  event.preventDefault();
                  this.props.filterByTag('مكان للشواء');
                }}
              >
                مكان للشواء
              </a>
              <a
                href=""
                className="black no-underline pa1 bl br bb b--black-20 pl3 bg-white"
                onClick={event => {
                  event.preventDefault();
                  this.props.filterByTag(' مكان للتخييم');
                }}
              >
                مكان للتخييم
              </a>
              <a
                href=""
                className="black no-underline pa1 bl br bb b--black-20 pl3 bg-white"
                onClick={event => {
                  event.preventDefault();
                  this.props.filterByTag('مكان للعب الاطفال');
                }}
              >
                مكان للعب الاطفال
              </a>
              <a
                href=""
                className="black no-underline pa1 bl br bb b--black-20 pl3 bg-white"
                onClick={event => {
                  event.preventDefault();
                  this.props.filterByTag('دخول مجاني');
                }}
              >
                دخول مجاني
              </a>
              <a
                href=""
                className="black no-underline pa1 bl br bb b--black-20 pl3 bg-white"
                onClick={event => {
                  event.preventDefault();
                  this.props.filterByTag('ممر للدراجات');
                }}
              >
                ممر للدراجات
              </a>
              <a
                href=""
                className="black no-underline pa1 bl br bb b--black-20 pl3 bg-white"
                onClick={event => {
                  event.preventDefault();
                  this.props.filterByTag('ملائم لكبار السن');
                }}
              >
                ملائم لكبار السن
              </a>
            </div>
          </div>
          <div className="filter w-30 tc z-1 pt2-ns">
            <button
              onClick={this.ShowByToggled}
              className="dropbtn white bg-park-blue changa pt1 bn"
            >
              اعرض حسب
            </button>
            <div
              className={
                this.state.isShowByToggled === true
                  ? 'flex dropdown-content flex-column tc'
                  : 'dn dropdown-content flex-column tc'
              }
            >
              <button
                onClick={() => this.props.changeFilter('distance')}
                className="black no-underline mt1 pa1 ba b--black-20 bg-white"
              >
                المسافه
              </button>
              <button
                onClick={() => this.props.changeFilter('rating')}
                className="black no-underline ma0 pa1 bl br bb b--black-20 bg-white"
              >
                تقييم الزوار
              </button>
              <button
                onClick={() => this.props.changeFilter('views')}
                className="black no-underline ma0 pa1 bl br bb b--black-20 bg-white"
              >
                مشاهدات
              </button>
            </div>
          </div>
        </nav>

        <nav
          className={
            this.props.location.includes('parkFullDetails')
              ? 'navbar3 h2 w-100 bg-park-blue bb b--white changa h3-ns z-1'
              : 'dn'
          }
        >
          <div className="w-100 tc pl3 h2 tl-ns v-mid flex items-center pt4-ns">
            <i className="fas fa-chevron-left white f6 fl f4-ns " />
            <a href="/" className="white no-underline f5 fl pl2 f3-ns">
              شاهد المزيد في هذه المنطقة
            </a>
          </div>
        </nav>

        <nav className={this.props.location === '/map' ? 'dn' : 'dn'}>
          <div className="showby w-50 br b--white tc z-1 pt2-ns">
            <button
              onClick={this.FilterToggled}
              className="dropbtn white bg-park-blue changa pt1 bn"
            >
              FILTER
            </button>
            <div
              className={
                this.state.isFilterToggled === true
                  ? 'flex dropdown-content flex-column tl'
                  : 'dn dropdown-content flex-column tl'
              }
            >
              <a
                href=""
                className="black no-underline mt1 pa1 ba b--black-20 pl3 bg-white"
              >
                waterfall
              </a>
              <a
                href=""
                className="black no-underline pa1 bl br bb b--black-20 pl3 bg-white"
              >
                BBQ
              </a>
              <a
                href=""
                className="black no-underline pa1 bl br bb b--black-20 pl3 bg-white"
              >
                campsite
              </a>
              <a
                href=""
                className="black no-underline pa1 bl br bb b--black-20 pl3 bg-white"
              >
                playground
              </a>
              <a
                href=""
                className="black no-underline pa1 bl br bb b--black-20 pl3 bg-white"
              >
                free entrance
              </a>
              <a
                href=""
                className="black no-underline pa1 bl br bb b--black-20 pl3 bg-white"
              >
                bike trail
              </a>
              <a
                href=""
                className="black no-underline pa1 bl br bb b--black-20 pl3 bg-white"
              >
                elderly-friendly
              </a>
            </div>
          </div>
          <div className="filter w-50 tc z-1 pt2-ns">
            <button
              onClick={this.ShowByToggled}
              className="dropbtn white bg-park-blue changa pt1 bn"
            >
              SHOW BY
            </button>
            <div
              className={
                this.state.isShowByToggled === true
                  ? 'flex dropdown-content flex-column tc'
                  : 'dn dropdown-content flex-column tc'
              }
            >
              <a
                href=""
                className="black no-underline mt1 pa1 ba b--black-20 bg-white"
              >
                distance
              </a>
              <a
                href=""
                className="black no-underline ma0 pa1 bl br bb b--black-20 bg-white"
              >
                rating
              </a>
              <a
                href=""
                className="black no-underline ma0 pa1 bl br bb b--black-20 bg-white"
              >
                views
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
