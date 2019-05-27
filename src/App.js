import React, { Component } from 'react';
import axios from 'axios';

import Tabs from './components/Tabs';
import Accordion from './components/Accordion';

import './temp/tempcss.css';

/*
  This is the main component of the application, it renders all the tabs and accordion menus.
  All the API calls are made from this component, which holds the information in its state
*/
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Title: '',
      Genres: '',
      Images: '',
      Synopsis: '',
      Year: '',
      Cast: [],
      episodes: []
    };
  }

  // The api requests are made inside this lifecycle method and the responses saved in the state
  componentDidMount() {
    axios
      .all([
        axios.get(
          'https://sample-api-78c77.firebaseio.com/tv-shows/SHOW123.json'
        ),
        axios.get(
          'https://sample-api-78c77.firebaseio.com/episodes/SHOW123.json'
        )
      ])
      .then(
        axios.spread((overview, episodes) => {
          const overviewRes = overview.data;
          const { Title, Images, Synopsis, Year, Cast } = overviewRes;
          const Genres = overviewRes.Genres.reduce(
            (acc, elem) => acc.Title + ', ' + elem.Title
          );
          this.setState({
            Title,
            Images,
            Synopsis,
            Year,
            Cast,
            Genres,
            episodes: episodes.data
          });
          const div = document.querySelector('.background');
          div.style.backgroundImage = `url(${this.state.Images.Background})`;
        })
      )
      .catch(err => console.log(err));
  }

  renderSeasons() {
    const episodes = this.state.episodes.filter(episode => episode !== null);
    const episodesObj = [];
    if (episodes.length < 1) {
      return undefined;
    }

    const seasons = episodes.reduce(
      (acc, episode) =>
        episode.SeasonNumber > acc ? episode.SeasonNumber : acc,
      0
    );

    for (let i = 0; i < seasons; i++) {
      episodesObj.push(
        <Accordion accordionClass='accordion' label={`Season ${i + 1}`} key={i}>
          {episodes
            .filter(episode =>
              episode ? episode.SeasonNumber === i + 1 : undefined
            )
            .map(episode => (
              <div label={episode.Title} key={episode.ID}>
                <div className='episode__synopsis'>{episode.Synopsis}</div>
                <div className='episode__image'>
                  <img
                    src={episode.Image}
                    alt={`Episode ${episode.EpisodeNumber}`}
                  />
                </div>
              </div>
            ))}
        </Accordion>
      );
    }
    return episodesObj;
  }

  render() {
    return (
      <div className='background'>
        <div className='wrapper'>
          <header>
            <div className='header__title'>
              <h1>{this.state.Title || ''}</h1>
              <h2>
                {this.state.Genres} / {this.state.Year || ''}
              </h2>
            </div>
          </header>
          <main>
            <Tabs tabsClass='main__tabs'>
              {this.renderSeasons() || (
                <div label='Season 1' key='default'>
                  Synopsis
                </div>
              )}
            </Tabs>
          </main>
        </div>
        <footer>
          <Tabs tabsClass='footer__tabs'>
            <div label='Sinopse'>
              <div className='synopsis'>{this.state.Synopsis || ''}</div>
            </div>
            <div label='Elenco'>
              {this.state.Cast.map(person => (
                <div className='cast__element' key={person.ID}>
                  {person.Name}
                </div>
              ))}
            </div>
          </Tabs>
        </footer>
      </div>
    );
  }
}
