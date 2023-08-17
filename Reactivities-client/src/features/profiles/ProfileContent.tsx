import React from 'react'
import { Profile } from '../../app/models/profile'
import { observer } from 'mobx-react-lite'
import { Tab } from 'semantic-ui-react'
import ProfilePhotos from './ProfilePhotos'
import ProfileFollowings from './ProfileFollowings'
import { useStore } from '../../app/stores/store'

interface Props {
  profile: Profile
}


const ProfileContent = ({profile}: Props) => {
    const {profileStore: {setActiveTab}} = useStore();
  const panes = [
    { menuItem: 'About', render: () => <Tab.Pane>About Content</Tab.Pane> },
    { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} />  },
    { menuItem: 'Events', render: () => <Tab.Pane>Events Content</Tab.Pane> },
    {
        menuItem: 'Followers',
        render: () => <ProfileFollowings />
    },
    {
        menuItem: 'Following',
        render: () => <ProfileFollowings />
    }
];

return (
    <Tab
        menu={{ fluid: true, vertical: true }}
        menuPosition='right'
        panes={panes}
        onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
)
}

export default observer(ProfileContent);