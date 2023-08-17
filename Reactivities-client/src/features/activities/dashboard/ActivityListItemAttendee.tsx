import React from 'react'
import { Profile } from '../../../app/models/profile'
import { observer } from 'mobx-react-lite'
import { Image, List, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ProfileCard from '../../profiles/ProfileCard'

interface Props{
    attendees: Profile[]
}

const ActivityListItemAttendee = ({attendees}: Props) => {
    const styles = {
        borderColor: 'orange',
        borderWidth: 3
    }
  return (
    <List horizontal>
            {attendees.map(attendee => (
                <Popup
                    hoverable
                    key={attendee.username}
                    trigger={
                        <List.Item as={Link} to={`/profiles/${attendee.username}`}>
                            <Image size='mini'
                                    style={attendee.following ? styles : null}
                                    bordered
                                   circular
                                   src={attendee.image || `/assets/user.png`} />
                        </List.Item>
                    }
                >
                    <Popup.Content>
                        <ProfileCard profile={attendee} />
                    </Popup.Content>
                </Popup>
            ))}
        </List>
  )
}

export default observer(ActivityListItemAttendee);