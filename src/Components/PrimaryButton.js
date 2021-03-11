// CkPrimaryButton
import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { GLOBAL_STYLES } from "../../global_styles";

export class PrimaryButton extends React.Component {
    render() {
		return (
            <View>
                <Button
                    buttonStyle={[GLOBAL_STYLES.primary_button_style, this.props.style]}
                    onPress={this.props.onPress}
                    title={this.props.title}
                    titleStyle={{color: '#FFFFFF', fontWeight: '600', fontSize: 14}}
                    disabled={this.props.disabled}
                    disabledStyle={{opacity: 0.5}}
                />
            </View>
		)
	}
}