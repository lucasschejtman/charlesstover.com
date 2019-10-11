import { List, Paper, Typography } from '@material-ui/core';
import React from 'react';
import articles from '../../../../assets/articles';
import ArticleLink from './article-link';
import withStyles from './articles-styles';
import mediumStats from './medium-stats';
import fixStats from './utils/fix-stats';
import sortArticlesByViews from './utils/sort-articles-by-views';

const EMPTY_STATS = Object.create(null);

class Articles extends React.PureComponent {

  mounted = true;

  state = {
    error: null,
    stats: EMPTY_STATS,
  };

  componentDidMount() {
    mediumStats.fetch()
      .then(stats => {
        if (this.mounted) {
          this.setState({
            stats: fixStats(stats),
          });
        }
      })
      .catch(err => {
        if (this.mounted) {
          this.setState({
            error:
              'An error occurred while determining the stats of the' +
              `articles: ${err.message}`,
          });
        }
      });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  get articles() {
    if (this.state.stats === EMPTY_STATS) {
      return articles;
    }
    return articles.sort(sortArticlesByViews(this.state.stats));
  }

  mapArticlesToLinks = link =>
    <ArticleLink
      key={link.mediumId}
      {...this.state.stats[link.title]}
      {...link}
    />;

  render() {
    return (
      <Paper className={this.props.classes.root}>
        <Typography
          className={this.props.classes.title}
          variant="h5"
        >
          Publications
        </Typography>
        <List className={this.props.classes.list}>
          {this.articles.map(this.mapArticlesToLinks)}
        </List>
        {this.props.children}
      </Paper>
    );
  }
}

export default withStyles(Articles);