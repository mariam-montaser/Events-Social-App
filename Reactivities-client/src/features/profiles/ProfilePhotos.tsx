import React, {SyntheticEvent, useState} from 'react'
import { Photo, Profile } from '../../app/models/profile'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react'
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget'

interface Props {
  profile: Profile
}

const ProfilePhotos = ({profile}: Props) => {
  const {profileStore: {isCurrentUser, uploadPhoto, uploading, 
    setMainPhoto, loading, deletePhoto}} = useStore();

  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState('');

  const handlePhotoUpload = (file: any) => {
    uploadPhoto(file).then(() => setAddPhotoMode(false))
  }

  const handleSetMain = (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) => {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  }

  const handleDeletePhoto = (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) => {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  }

  return (
    <Tab.Pane>
        <Grid>
            <Grid.Column width='16'>
                <Header floated='left' icon='image' content='Photos' />
                {isCurrentUser && (
                    <Button floated='right' basic content={addPhotoMode ? 'Cancel' : 'Add' +
                        ' Photo'} onClick={() => setAddPhotoMode(!addPhotoMode)} />
                )}
            </Grid.Column>
            <Grid.Column width='16'>
                {addPhotoMode ? (
                    <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                ) : (
                    <Card.Group itemsPerRow={5}>
                        {profile.photos?.map(photo => (
                            <Card key={photo.id}>
                                <Image src={photo.url} />
                                {isCurrentUser && (
                                    <Button.Group fluid widths={2}>
                                        <Button
                                            basic
                                            color='green'
                                            content='Main'
                                            name={'main' + photo.id}
                                            loading={target === 'main' + photo.id && loading}
                                            disabled={photo.isMain}
                                            onClick={e => handleSetMain(photo, e)}
                                        />
                                        <Button
                                            name={photo.id}
                                            loading={loading && photo.id === target}
                                            onClick={(e) => handleDeletePhoto(photo, e)}
                                            basic
                                            color='red'
                                            icon='trash'
                                            disabled={photo.isMain}
                                        />
                                    </Button.Group>
                                )}
                            </Card>
                        ))}
                    </Card.Group>
                )}
            </Grid.Column>
        </Grid>
    </Tab.Pane>
)
}

export default observer(ProfilePhotos);