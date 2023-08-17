import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from '../../app/stores/store';
import Loading from '../../app/layout/Loading';
import { Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import { observer } from 'mobx-react-lite';

const ProfilePage = () => {
  const { username } = useParams();
  const { profileStore: { loadProfile, loadingProfile, profile, setActiveTab } } = useStore();

  useEffect(() => {
    if (username) loadProfile(username);
    return () => {
      setActiveTab(0);
    }

  }, [username, loadProfile])

  if (loadingProfile) return <Loading inverted content='Loading profile...' />

  if (!profile) return <h2>Problem loading profile</h2>

  return (
    <Grid>
      <Grid.Column width='16'>
        <ProfileHeader profile={profile} />
        <ProfileContent profile={profile} />
      </Grid.Column>
    </Grid>
  )
}

export default observer(ProfilePage);