'use strict';

import SettingsProvider, { SettingsContext } from "./SettingsProvider";
import { useContext } from 'react';
import { render, screen } from '@testing-library/react'

describe ('Settings context, ', () => {

  test('Should give sort, hideCompleted and displayItems to children', () => {

    render (
      <SettingsProvider>
        {/* Purpose of the next line:  */}
        <SettingsContext.Consumer> 
          {(context) => (
            <>
              <p>{context.sort}</p>
              <p>{context.displayItems}</p>
              <p>{`${context.hideCompleted}`}</p>
            </>
          )}
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    expect(screen.getByText('3')).toBeVisible();
    expect(screen.getByText('false')).toBeVisible();
    expect(screen.getByText('difficulty')).toBeVisible();
  });
});
