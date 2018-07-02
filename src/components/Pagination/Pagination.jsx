import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col, Row, Pagination } from "react-bootstrap";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];
  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
};

class Paginations extends Component {
  constructor(props) {
    super(props);
    const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;

    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
    this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;

    this.pageNeighbours =
      typeof pageNeighbours === "number"
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;

    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

    this.state = { currentPage: 1 };
  }
  gotoPage = page => {
    const { onPageChanged = f => f } = this.props;
    const currentPage = Math.max(0, Math.min(page, this.totalPages));
    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords
    };
    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };
  handleClick = (page, evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - this.pageNeighbours * 2 - 1);
  };

  handleMoveRight = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + this.pageNeighbours * 2 + 1);
  };

  fetchPageNumbers = () => {
    const { totalPages, pageNeighbours } = this;
    const { currentPage } = this.state;

    const totalNumbers = this.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };
  render() {
    if (!this.totalRecords) return null;
    if (this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();
    const items = _.map(pages, (page, index) => {
      if (page === LEFT_PAGE)
        return (
          <Pagination.Item key={index} onClick={this.handleMoveLeft}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </Pagination.Item>
        );
      if (page === RIGHT_PAGE)
        return (
          <Pagination.Item key={index} onClick={this.handleMoveRight}>
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </Pagination.Item>
        );
      return (
        <Pagination.Item
          key={index}
          active={currentPage === page}
          onClick={e => this.handleClick(page, e)}
        >
          {page}
        </Pagination.Item>
      );
    });

    return (
      <div className="paginations">
        <Row>
          <Col sm={12}>
            <span className="pager">
              <span>Page { currentPage } of {this.totalPages}</span>
            </span>
            <div className="previous">
              <Link to="#" onClick={this.handleMoveLeft}>
                <span>Previous</span>
              </Link>
            </div>
            <Pagination>{items}</Pagination>
            <div className="next">
              <Link to="#" onClick={this.handleMoveRight}>
                <span>Next</span>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};
export default Paginations;
