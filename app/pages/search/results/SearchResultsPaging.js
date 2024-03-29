import constants from 'constants/AppConstants';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';

import { injectT } from 'i18n';
import { getSearchPageUrl } from 'utils/searchUtils';

class SearchResultsPaging extends React.Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    resultCount: PropTypes.number.isRequired,
    history: PropTypes.object.isRequired,
  };

  handleClick(page) {
    const { filters, history } = this.props;
    const nextPageFilters = { ...filters, page };
    history.push(getSearchPageUrl(nextPageFilters));
  }

  renderPageButtons(pageCount, currentPage) {
    let current = 1;
    const pages = [];
    while (current <= pageCount) {
      pages.push(this.renderPageButton(current, currentPage));
      current += 1;
    }
    return pages;
  }

  renderPageButton(page, currentPage) {
    return (
      <Button
        className={classNames('app-SearchResultsPaging__page', {
          'app-SearchResultsPaging__selected': currentPage === page,
        })}
        key={`page${page}`}
        onClick={() => this.handleClick(page)}
      >
        {page}
      </Button>
    );
  }

  render() {
    const { resultCount } = this.props;
    if (!resultCount) {
      return <div />;
    }

    const { page } = this.props.filters || 1;
    const pages = Math.ceil(resultCount / constants.SEARCH_PAGE_SIZE);

    return (
      <div className="app-SearchResultsPaging">
        <Button
          className="app-SearchResultsPaging__prev"
          disabled={page === 1}
          onClick={() => this.handleClick(page - 1)}
        >

          &laquo;
        </Button>
        {this.renderPageButtons(pages, page)}
        <Button
          className="app-SearchResultsPaging__next"
          disabled={page >= pages}
          onClick={() => this.handleClick(page + 1)}
        >

          &raquo;
        </Button>
      </div>
    );
  }
}

export default injectT(SearchResultsPaging);
