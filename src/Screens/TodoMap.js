import React from 'react';
import { View, Text, SafeAreaView, Image , TouchableOpacity} from 'react-native';
import { GLOBAL_STYLES } from "../../global_styles";
import { APP_LEVEL_CONSTANTS } from "../../app_level_constants";
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';

const DEFAULT_PADDING = { top: 60, right: 60, bottom: 60, left: 60 };

export default class ToDoMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapData: props.route.params.data ? props.route.params.data : [],
            region: {
                latitude: 50.9575733,
                longitude: 15.7384571,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009
            }, 
            tappedMarker: {},
            showMarkerDataPopup: false
        }
    }

    componentDidMount() {
        if(this.state.mapData && this.state.mapData.length === 0) {
            fetch('https://run.mocky.io/v3/82f1d43e-2176-4a34-820e-2e0aa4566b5c').then((resp) => 
                resp.json()
            ).then((json) => {
                this.setState({
                    mapData: json,
                })
            }).catch((error) => {
                console.log("Error while fetching data", error)
            })
        }
    }

      fitAllMarkers() {
        this.map.fitToCoordinates(this.state.mapData, {
            edgePadding: DEFAULT_PADDING,
            animated: true,
        });
    }

    onPressMarker = (item) => {
        this.setState({
            showMarkerDataPopup: true,
            tappedMarker: item
        })
    }

    closeModal = () => {
        this.setState({
            showMarkerDataPopup: false
        })
    }

    render() {
        return (
            <View style={[GLOBAL_STYLES.container_stretch, {width: '100%'}]}>
            <MapView
                ref={ref => {
                    this.map = ref;
                }}
                style={{flex: 1}}
                initialRegion={this.state.region}
                onMapReady={this.fitAllMarkers.bind(this)}
                >
                {this.state.mapData.map(marker => (
                    <Marker
                        coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                        title={marker.title}
                        key={marker.id}
                        onPress={() => this.onPressMarker(marker)}
                    />
                ))}
                </MapView>

                <Modal 
                    isVisible={this.state.showMarkerDataPopup}
                    animationType={'fade'}
                    transparent={true}
                    onRequestClose={() => this.closeModal()}
                    onBackdropPress={() => this.closeModal()}
                >
                    <SafeAreaView style={[ GLOBAL_STYLES.modalTransparentBackground, { borderRadius: 10 }]}>
                        <View style={[GLOBAL_STYLES.filter_modal_header]}>
                            <Text style={GLOBAL_STYLES.modal_header_text}>{APP_LEVEL_CONSTANTS.mapModal.marker_details}</Text>
                        </View>
                        <View style={{padding: 16}}>
                            <View>
                                <Text style={GLOBAL_STYLES.map_title_text}>{APP_LEVEL_CONSTANTS.mapModal.title}</Text>
                                <Text>{this.state.tappedMarker.title}</Text>
                            </View>
                            <View style={{marginTop: 10}}>
                                <Text style={GLOBAL_STYLES.map_title_text}>{APP_LEVEL_CONSTANTS.mapModal.subtitle}</Text>
                                <Text>{this.state.tappedMarker.subtitle}</Text>
                            </View>
                            <View style={{marginTop: 10}}>
                                <Text style={GLOBAL_STYLES.map_title_text}>{APP_LEVEL_CONSTANTS.mapModal.short_description}</Text>
                                <Text>{this.state.tappedMarker.short_desc}</Text>
                            </View>
                            <View style={{marginTop: 10}}>
                                <Text style={GLOBAL_STYLES.map_title_text}>{APP_LEVEL_CONSTANTS.mapModal.long_description}</Text>
                                <Text>{this.state.tappedMarker.long_desc}</Text>
                            </View>
                        </View>
                    </SafeAreaView>
                </Modal>
            </View>
        )
    }
}