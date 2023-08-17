import React, {Fragment, SyntheticEvent, useState } from 'react';
import { Button, Header, Item, Label, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import ActivityListItem from './ActivityListItem';



const ActivityList = () => {

    const { activityStore } = useStore();
    const { deleteActivity, groupedActivities, activitiesByDate, loading } = activityStore;

    const [target, setTarget] = useState('');

    const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>{group}</Header>
                    {activities && activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity} />
                    ))}
                </Fragment>
            ))}

        </>
    )
}

export default observer(ActivityList);
