import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { GLOBAL_STYLES } from "../../global_styles";

export class TodoInput extends React.Component {
    render() {
        return(
            <View>
                <TextInput
                    autoFocus={this.props.autoFocus}
                    placeholder={this.props.placeholder}
                    style={[GLOBAL_STYLES.input_style, this.props.style]}
                    value={this.props.value}
                    onChangeText={this.props.onChangeText}
                    keyboardType={this.props.keyboardType}
                    maxLength={this.props.maxLength}
                />
                {this.props.errorMsg ? 
                    <View>
                        <Text style={{color: 'red'}} numberOfLines={1}>{this.props.errorMsg}</Text>
                    </View>
                : null
                }
            </View>
        )
    }
}