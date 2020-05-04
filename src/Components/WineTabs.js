import React from 'react';
import { Tabs, Tab } from '@material-ui/core';

const WineTabs = (props) => {
  return (
    <Tabs
      onChange={props.tabHandler}
      id="tabs"
      value={props.selectedWine}
      indicatorColor="primary"
      centered
    >
      <Tab label={props.tabLabel('Riesling', 'Germany')} value="riesling" />
      <Tab
        label={props.tabLabel('Sauvignon Blanc', 'Sancerre')}
        value="sancerre"
      />
      <Tab
        label={props.tabLabel('Chardonnay', 'Napa Valley')}
        value="chardonnay"
      />
      <Tab
        label={props.tabLabel('Cabernet Sauvignon', 'Napa Valley')}
        value="napa-cab"
      />
      <Tab label={props.tabLabel('Malbec', 'Argentina')} value="malbec" />
      <Tab
        label={props.tabLabel('Pinot Noir', 'Burgundy')}
        value="red-burgundy"
      />
    </Tabs>
  );
};

export default WineTabs;
