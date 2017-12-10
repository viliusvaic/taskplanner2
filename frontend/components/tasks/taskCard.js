import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import TimeIcon from 'material-ui/svg-icons/image/timelapse';

class taskCard extends Component {
    _renderTimeIcon() {
        if (this.props.weight) {
            return (
                <div
                    style={{
                        width: '20%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <span
                        style={{
                            marginTop: '7px',
                        }}
                    >
                        {this.props.weight}
                    </span>
                    <TimeIcon
                        style={{
                            marginTop: '5px',
                            marginLeft: '2px',
                            height: '20px',
                            width: '20px'
                        }}
                    />
                </div>
            )
        }
    }


    render() {
        const onHeaderClick = this.props.onHeaderClick;

        return (
            <Card
                style={{
                    width: '240px',
                    height: '120px',
                    marginTop: '7px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
                containerStyle={{
                    height: '100%'
                }}
                draggable="true"
                onDragStart={this.props.onTaskDrag}
                onDragEnd={this.props.onTaskDragEnd}
            >
                <div
                    style={{
                        width: '100%',
                        display: 'flex'
                    }}
                >
                    <CardHeader
                        title={this.props.name.length > 20 ? this.props.name.substr(0, 18) + '...' : this.props.name}
                        subtitle={this.props.deadline ? this.props.deadline : ''}
                        style={{
                            cursor: 'pointer',
                            height: '35%',
                            width: '80%',
                            padding: '5px',
                            wordWrap: 'break-word'
                        }}
                        titleStyle={{
                            wordWrap: 'break-word'
                        }}
                        subtitleStyle={{
                            wordWrap: 'break-word'
                        }}
                        onClick={onHeaderClick}
                    >
                    </CardHeader>
                    {this._renderTimeIcon()}
                </div>
                <CardText
                    style={{
                        padding: '5px',
                        height: '65%',
                        wordWrap: 'break-word'
                    }}
                >
                    {this.props.description && this.props.description.length > 85 ? this.props.description.substr(0, 85) + '...' : this.props.description}
                </CardText>
            </Card>
        )
    }
}

export default taskCard;