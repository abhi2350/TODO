import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import { GLOBAL_STYLES } from "../../global_styles";
import { APP_LEVEL_CONSTANTS } from "../../app_level_constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { TodoInput } from "../Components/TodoInput"
import { PrimaryButton } from "../Components/PrimaryButton"


const { width } = Dimensions.get("window");

export default class ToDoListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: null,
            data: [],
            fileteredData: [],
            showFilterPopup: false,
            allStatus: []
        }
    }

    componentDidMount() {
        this.getAndSetTodoListData();
    }

    getAndSetTodoListData = () => {
        fetch('https://run.mocky.io/v3/82f1d43e-2176-4a34-820e-2e0aa4566b5c').then((resp) => 
            resp.json()
        ).then((json) => {
            let allStatus = []
            if(json.length > 0) {
                json.forEach((item) => {
                    if(allStatus.indexOf(item['status']) === -1) {
                        allStatus.push(item['status']);
                    }
                })
            }
            this.setState({
                data: json,
                fileteredData: json,
                allStatus
            })
        }).catch((error) => {
            console.log("Error while fetching data", error)
        })
    }

    getHeader = () => {
        return (
            <View style={[GLOBAL_STYLES.dashboard_header]}>
                <View>
                    <Text 
                        style={[GLOBAL_STYLES.dashboard_header_text]}>
                            {APP_LEVEL_CONSTANTS.todoListingScreen.assigned_to_me
                    }</Text>
                </View>
                <TouchableOpacity 
                    style={{flex: 1,justifyContent: 'flex-end', alignItems: 'flex-end'}}
                    onPress={() => {
                        this.props.navigation.navigate('TodoMap', {data: this.state.data})
                    }}>
                    <Image style={{width: 40, height: 40}} source={require('../../img/location.png')} /> 
                </TouchableOpacity>
            </View>
        )
    }

    renderListData = ({item, index}) => {
        return (
            <View style={[GLOBAL_STYLES.container_stretch, {backgroundColor: '#ffffff', borderRadius: 5, padding: 16}]}>
                <View style={{flexDirection: 'row'}}>
                    <View style={[GLOBAL_STYLES.profile_pic, {backgroundColor: item['status'] ? item['status'].toLowerCase() : '#000000'}]}>
                        <Text style={GLOBAL_STYLES.profile_pic_text}>{item['title'] ? item['title'][0] : 'A'}</Text>
                    </View>
                    <View style={{flexDirection: 'column', marginLeft: 12}}>
                        <View style={GLOBAL_STYLES.notes_title_container}>
                            <View style={{flexBasis: '60%'}}>
                                <Text style={GLOBAL_STYLES.notes_title_text}>{item['title']}</Text>
                            </View>
                            <View style={{flexBasis: '25%', marginLeft: 16}}>
                                <View style={[GLOBAL_STYLES.notes_status_text, {backgroundColor: item['status'].toLowerCase()}]}>
                                    <Text style={{color: '#ffffff'}}>{item['status']}</Text>
                                </View>

                            </View>
                        </View>
                        <Text style={GLOBAL_STYLES.notes_subtitle_text}>{item['subtitle']}</Text>
                    </View>
                </View>
                <View style={GLOBAL_STYLES.dotted_line_separator } />

                <View style={GLOBAL_STYLES.date_contatiner}>
                    <Image style={GLOBAL_STYLES.short_image} source={require('../../img/calendar.png')} />
                    <Text style={GLOBAL_STYLES.created_by_text}>{APP_LEVEL_CONSTANTS.todoListingScreen.created + ': '}</Text>
                    <Text style={{fontSize: 16}}>{item['created']}</Text>
                </View>

                <View style={GLOBAL_STYLES.dotted_line_separator } />

                <View style={GLOBAL_STYLES.date_contatiner}>
                    <Image style={GLOBAL_STYLES.short_image} source={require('../../img/list.png')} />
                    <Text style={{fontSize: 14, marginLeft: 16, paddingRight: 16}}>{item['short_desc']}</Text>
                </View>
                {this.state[`card${index}`] ? 
                    <View style={GLOBAL_STYLES.date_contatiner}>
                        <Image style={GLOBAL_STYLES.short_image} source={require('../../img/clipboard.png')} />
                        <Text style={{fontSize: 14, marginLeft: 16}}>{item['long_desc']}</Text>
                    </View>
                    : null
                }
                <TouchableOpacity
                    style={{alignItems: 'center', width: '100%', marginTop: 16}}
                    onPress={() => this.toggleIcon(index)}
                >
                    <Image style={GLOBAL_STYLES.arrow_icon} source={this.state[`card${index}`] ? require('../../img/up_icon.png') : require('../../img/down_icon.png')} />
                </TouchableOpacity>
            </View>
        )
    }

    renderNoContent = () => {
        if(this.state.searchValue && this.state.searchValue.trim() && this.state.fileteredData.length === 0) {
            return (
                <View style={{ marginTop: 80, width: width, alignItems: "center" }}>
                    <Image source={require('../../img/searchMessageIcon.png')} />
                    <Text style={{ paddingTop: 15, width: 300, textAlign: "center" }}>
                        {APP_LEVEL_CONSTANTS.todoListingScreen.no_result_msg +
                            `'${this.state.searchValue}'`}
                    </Text>
                </View>
            )
        }
        return null

    }

    toggleIcon = (index) => {
        this.setState({
            [`card${index}`]: !this.state[`card${index}`],
        })
    }

    renderSeparator = () => {
        return (
            <View style={GLOBAL_STYLES.notes_divider_section} />
        )
    }

    renderAllStatus = ({item, index}) => {
        return (
            <TouchableOpacity 
                style={{marginVertical: 5}}
                onPress={() => this.onPressFilterOption(item)}>
                <View style={GLOBAL_STYLES.status_container}>
                    <Text>{item}</Text>
                    <Image style={GLOBAL_STYLES.arrow_icon} source={require('../../img/right_icon.png')} />
                </View>
                <View style={GLOBAL_STYLES.divider_line}></View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <SafeAreaView style={[GLOBAL_STYLES.container_stretch]}>
                {this.getHeader()}
                <View style={[GLOBAL_STYLES.search_filter_container]}>
                    <View style={{flex: 1}}>
                        <TodoInput 
                            placeholder={'Search...'}
                            value={this.state.searchValue}
                            style={GLOBAL_STYLES.searchBar_style}
                            onChangeText={this.onSearchTextChange}
                        />
                    </View>
                    <View style={{marginLeft: 20}}>
                        <PrimaryButton
                            style={{width: 60, height: 36}}
                            title={'Filter'}
                            onPress={this.onFilterPress}
                        />
                    </View>
                </View>

                <View style={{marginTop: 15, paddingHorizontal: 16}}>
                    <FlatList
                        data={this.state.fileteredData}
                        keyExtractor={this.keyExtractor}
                        ListFooterComponent={this.renderNoContent}
                        renderItem={this.renderListData}
                        scrollEnabled
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={this.renderSeparator}
                        extraData={this.state}
                    />
                        
                </View>
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    isVisible={this.state.showFilterPopup}
                    onRequestClose={() => this.closeModal()}
                    onBackdropPress={() => this.closeModal()}
                    >
                    <SafeAreaView style={[ GLOBAL_STYLES.modalTransparentBackground, { borderRadius: 10 }]}>
                        <View style={GLOBAL_STYLES.filter_modal_header}>
                            <Text style={GLOBAL_STYLES.modal_header_text}>{APP_LEVEL_CONSTANTS.filterModal.choose_option}</Text>
                        </View>
                        <FlatList 
                            style={{backgroundColor: '#ffffff', height: 250, padding: 16, }}
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.allStatus}
                            renderItem={this.renderAllStatus}
                            showsVerticalScrollIndicator={false}
                        />
                        <View style={{ flexDirection: 'row',justifyContent: 'flex-end', backgroundColor: '#ffffff', width: '100%', paddingVertical: 16, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '40%'}}>
                                <PrimaryButton
                                    title={APP_LEVEL_CONSTANTS.filterModal.cancel}
                                    onPress={this.closeModal}
                                />
                                <PrimaryButton
                                    title={APP_LEVEL_CONSTANTS.filterModal.reset}
                                    onPress={() => {this.setState({fileteredData: this.state.data, showFilterPopup: false})}}
                                />
                            </View>
                        </View>
                    </SafeAreaView>

                </Modal>

            </SafeAreaView>
        )
    }

    onPressFilterOption = (filterItem) => {
        let data = [...this.state.fileteredData]
        let fileteredData = data.filter(item => item.status && item.status === filterItem)
        this.setState({
            fileteredData: fileteredData,
            showFilterPopup: false
        })
    }

    closeModal = () => {
        this.setState({
            showFilterPopup: false
        })
    }

    keyExtractor = (item, index) => {
        return item['id'].toString();
    }

    onSearchTextChange = (text) => {
        this.setState({
            searchValue: text
        }, () => {
            if (!(text && text.trim())) {
                this.setState(prevState => ({
                    fileteredData: prevState.data
                }))
                return
            }
            let query = text.toLowerCase();
            let data = [...this.state.data]
            let fileteredData = data.filter(
                item =>
                    (item.title && item.title.toLowerCase().indexOf(query) >= 0) ||
                    (item.subtitle && item.subtitle.toLowerCase().indexOf(query) >= 0)
            )
            this.setState({
                fileteredData: fileteredData,
            })
        })
    }

    onFilterPress = () => {
        this.setState({
            showFilterPopup: true
        })
    }
}