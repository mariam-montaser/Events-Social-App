import React, {SyntheticEvent} from 'react'
import { Profile } from '../../app/models/profile'
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { Button, Reveal } from 'semantic-ui-react';

interface Props{
    profile: Profile;
}

const FollowButton = ({profile}: Props) => {
    const {profileStore:{updateFollowing, loading}, userStore} = useStore();
    
    const handleFollow = (e: SyntheticEvent, username: string) => {
        e.preventDefault();
        profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
    }

    if (userStore.user?.username === profile.username) return null;

    return (
        <Reveal animated='move'>
            <Reveal.Content visible style={{ width: '100%' }}>
                <Button
                    fluid
                    color='teal'
                    content={profile.following ? 'Following' : 'Not Following'}
                />
            </Reveal.Content>
            <Reveal.Content hidden>
                <Button
                    loading={loading}
                    fluid
                    basic
                    color={profile.following ? 'red' : 'green'}
                    content={profile.following ? 'Unfollow' : 'Follow'}
                    onClick={(e) => handleFollow(e, profile.username)}
                />
            </Reveal.Content>
        </Reveal>
    )
}

export default observer(FollowButton);