import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RegisterMaintenance from '../pages/RegisterMaintenance';
import RegisterMotor from '../pages/RegisterMotor';
import UpdateLocationMotor from '../pages/UpdateLocationMotor';
import GalleryMotors from '../pages/GalleryMotors';
import MotorPage from '../pages/MotorPage';

const Routes: React.FC = () => {

  return (
    <Switch>
      <Route path='/' exact component={RegisterMaintenance} />
      <Route path='/maintenance-motor/:numIdMotor' exact component={RegisterMaintenance} />
      <Route path='/register-motor' component={RegisterMotor} />
      <Route path='/update-motor/:numId' component={UpdateLocationMotor} />
      <Route path='/gallery-motor' component={GalleryMotors}/>
      <Route path='/motor/:numId' component={MotorPage}/>
    </Switch>
  );
}

export default Routes;
