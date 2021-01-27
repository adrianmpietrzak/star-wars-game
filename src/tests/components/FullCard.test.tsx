import React from 'react';
import { render } from '@testing-library/react';
import { peopleDecidedKey, peopleKeysToPrint } from '../../types/card';
import FullCard from '../../components/FullCard';

const person = {
  birth_year: 'unknown',
  created: '2014-12-18T11:16:33.020000Z',
  edited: '2014-12-20T21:17:50.367000Z',
  eye_color: 'brown',
  films: ['http://swapi.dev/api/films/3/'],
  gender: 'male',
  hair_color: 'brown',
  height: 'unknown',
  homeworld: 'http://swapi.dev/api/planets/28/',
  name: 'Arvel Crynyd',
  skin_color: 'fair',
  species: [],
  starships: ['http://swapi.dev/api/starships/28/'],
  url: 'http://swapi.dev/api/people/29/',
  vehicles: [],
  mass: '5',
};

const keysToPrint = peopleKeysToPrint;
const boldKey = peopleDecidedKey;

describe('FullCard', () => {
  it('Check if print correct values and labels', () => {
    const playerCard = render(<FullCard info={person} keysToPrint={keysToPrint} boldKey={boldKey} />);

    const massLabel = playerCard.queryByTestId('label-mass');
    const massValue = playerCard.queryByTestId('value-mass');
    expect(massLabel?.innerHTML).toBe('mass');
    expect(massValue?.innerHTML).toBe('5');

    const skinLabel = playerCard.queryByTestId('label-skin_color');
    const skinValue = playerCard.queryByTestId('value-skin_color');
    expect(skinLabel?.innerHTML).toBe('skin color');
    expect(skinValue?.innerHTML).toBe('fair');
  });
});
