import React, { Component } from 'react';
import axios from 'axios';

import Tabs from './components/Tabs';
import Accordion from './components/Accordion';

import './temp/tempcss.css';

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

  renderSeasons() {}

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
              <Accordion accordionClass='accordion' label='Season 1'>
                <div
                  label={
                    this.state.episodes[0]
                      ? this.state.episodes[0].Title
                      : 'title'
                  }
                >
                  <p>Paragraph inside first section</p>
                </div>
                <div
                  label={
                    this.state.episodes[1]
                      ? this.state.episodes[1].Title
                      : 'title2'
                  }
                >
                  <p>Paragraph inside second section</p>
                </div>
                <div label='Third Section'>
                  <p>Paragraph inside third section</p>
                </div>
              </Accordion>
              <Accordion accordionClass='accordion' label='Season 2'>
                <div label='First Section 2'>
                  <p>Paragraph inside first section 2</p>
                </div>
                <div label='Second Section 2'>
                  <p>Paragraph inside second section 2</p>
                </div>
                <div label='Third Section 2'>
                  <p>Paragraph inside third section 2</p>
                </div>
              </Accordion>
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
