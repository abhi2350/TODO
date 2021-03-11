import {
	StyleSheet,
	Dimensions
} from 'react-native';
const { width } = Dimensions.get("window");

export const GLOBAL_STYLES = StyleSheet.create({

	modalTransparentBackground: { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
	quickRatingOptionsBackground: { backgroundColor: 'rgba(33, 38, 54, 0.7)' },

    container_center: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'flex-start',
		backgroundColor: '#FFFFFF'
	},
	
    container_center_darker: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'flex-start',
		backgroundColor: '#f1f1f1'
    },
    
    container_stretch: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		alignContent: 'stretch',
		backgroundColor: '#f1f1f1'
	},
	
	top_navbar_leftButton: {
		width: 50,
		height: '100%',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingLeft: 16
	},

	dashboard_header: {
		flexDirection: 'row',
		width: width, 
		height: 60, 
		backgroundColor: 'orange',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 16
	},

	dashboard_header_text: {
		color: '#FFFFFF', 
		fontSize: 18,
		fontWeight: '600'
	},

	input_style: {
		// width: width, 
		height: 30,
		borderColor: 'gray',
		borderWidth: 1,
		padding: 8
	},

	searchBar_style: {
		borderRadius: 8, 
		height: 40, 
		backgroundColor: '#ffffff', 
		borderWidth: 0
	},

	primary_button_style: {
		backgroundColor: 'orange'
	},

	search_filter_container: {
		flexDirection: 'row', 
		paddingHorizontal: 16, 
		alignItems: "center",
		justifyContent: 'center',
		marginTop: 15
	},

	notes_divider_section: {
		width: '100%',
		height: 10,
		backgroundColor: '#F5F5F5',
	},

	notes_title_text: {
		fontSize: 18,
		fontWeight: '600'
	},

	notes_subtitle_text: {
		fontSize: 14,
		color: 'grey',
		marginTop: 5,
		fontWeight: '500'
	},

	notes_status_text: {
		color: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
		height: 25, 
		borderRadius: 12
	},

	dotted_line_separator: {
		borderStyle: 'dashed',
		borderWidth: 1,
		borderRadius: 1,
		borderColor: 'grey',
		opacity: 0.3,
		marginTop: 12
	},

	date_contatiner: {
		flexDirection: 'row',
		marginTop: 12, 
		alignItems: 'center'
	},

	created_by_text: {
		fontSize: 16, 
		color: 'grey',
		marginLeft: 16
	},

	short_image: {
		width: 15,
		height: 15
	},

	profile_pic: {
		width: 40, 
		height: 40, 
		borderRadius: 20, 
		alignItems: 'center', 
		justifyContent: 'center'
	},

	filter_modal_header: {
		backgroundColor: '#f5f5f4', 
		width: '100%', 
		height: 50, 
		alignItems: 'flex-start', 
		justifyContent: 'center', 
		paddingHorizontal: 16,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	},

	divider_line: {
		width: '100%', 
		height: 1, 
		backgroundColor: 'grey', 
		opacity: 0.3
	},

	map_title_text: {
		fontSize: 18,
		fontWeight: '600',
		opacity: 0.8	
	},

	modal_header_text: {
		color: 'grey', 
		fontSize: 16, 
		textTransform: 'uppercase'
	},

	profile_pic_text: {
		color: '#ffffff', 
		fontSize: 20, 
		fontWeight: '600'
	},

	notes_title_container: {
		flexDirection: 'row', 
		flex: 1,
		alignItems: "center",
		justifyContent: 'space-between'
	},

	status_container: {
		flexDirection: 'row', 
		backgroundColor: '#ffffff', 
		alignItems: 'flex-start', 
		width: '100%',
		height: 30, 
		justifyContent: 'space-between'
	},

	arrow_icon: {
        width: 15, 
        height: 15
    }
	
})