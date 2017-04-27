import ICONS from '../src/utils/icons';
import React from 'react';
import TimePicker from '../src/components/TimePicker';
import timeHelper from '../src/utils/time';

class TimePickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    const {
      defaultTime,
      meridiem,
      timeMode,
      focused,
      timezone,
      showTimezone,
      editableTimezone } = props;

    // We need both a 12h and 24h formatted time here in the parent
    // so we can infer the meridiem and pass it down to the children
    const time = (defaultTime && meridiem) ? `${defaultTime}${meridiem}` : defaultTime;
    const timeIn12Hour = timeHelper.time(time, 12);
    const timeIn24Hour = timeHelper.time(defaultTime);

    const [hour, minute] = timeIn24Hour;
    const quantum = timeIn12Hour[2]; // AM or PM

    this.state = {
      hour,
      minute,
      meridiem: quantum,
      timeMode,
      focused,
      timezone,
      showTimezone,
      editableTimezone
    };

    this.onFocusChange = this.onFocusChange.bind(this);
    this.onHourChange = this.onHourChange.bind(this);
    this.onMinuteChange = this.onMinuteChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onTimeQuantumChange = this.onTimeQuantumChange.bind(this);
    this.onTimeModeChange = this.onTimeModeChange.bind(this);
    this.onTimezoneChange = this.onTimezoneChange.bind(this);
    this.onShowTimezoneChange = this.onShowTimezoneChange.bind(this);
    this.onEditTimezoneChange = this.onEditTimezoneChange.bind(this);
  }

  onHourChange(hour) {
    this.setState({ hour });
  }

  onMinuteChange(minute) {
    this.setState({ minute });
  }

  onTimeChange(time) {
    const [ hour, minute ] = time.split(':');
    this.setState({ hour, minute });
  }

  onTimeQuantumChange(meridiem) {
    this.setState({ meridiem });
  }

  onTimeModeChange(timeMode) {
    this.setState({ timeMode });
  }

  onFocusChange(focused) {
    this.setState({ focused });
  }

  onTimezoneChange(timezone) {
    this.setState({ timezone });
  }

  onShowTimezoneChange(showTimezone) {
    this.setState({ showTimezone });
  }

  onEditTimezoneChange(editableTimezone) {
    this.setState({ editableTimezone });
  }

  handleFocusedChange() {
    const { focused } = this.state;
    this.setState({ focused: !focused });
  }

  get basicTrigger() {
    const { hour, minute } = this.state;
    return (
      <div
        onClick={this.handleFocusedChange.bind(this)}
        className="time_picker_trigger">
        <div>
          Click to open panel<br/>
          {hour}:{minute}
        </div>
      </div>
    )
  }

  get customTrigger() {
    return (
      <div
        onClick={this.handleFocusedChange.bind(this)}
        className="time_picker_trigger">
        {ICONS.time}
      </div>
    );
  }

  get trigger() {
    const { customTriggerId } = this.props;
    const triggers = {
      0: (<div></div>),
      1: this.basicTrigger,
      2: this.customTrigger
    };
    return triggers[customTriggerId];
  }

  render() {
    const {
      hour,
      minute,
      meridiem,
      timeMode,
      focused,
      timezone,
      showTimezone,
      editableTimezone } = this.state;

    return (
      <div className="time_picker_wrapper">
        <TimePicker
          {...this.props}
          time={hour && minute ? `${hour}:${minute}` : null}
          meridiem={meridiem}
          timeMode={timeMode}
          onHourChange={this.onHourChange}
          onMinuteChange={this.onMinuteChange}
          onTimeChange={this.onTimeChange}
          onFocusChange={this.onFocusChange}
          onTimeQuantumChange={this.onTimeQuantumChange}
          onTimezoneChange = {this.onTimezoneChange}
          onShowTimezoneChange = {this.onShowTimezoneChange}
          onEditTimezoneChange = {this.onEditTimezoneChange}
          trigger={this.trigger}
          focused={focused}
          timezone={timezone}
          showTimezone={showTimezone}
          editableTimezone={editableTimezone}
        />
      </div>
    )
  }
}

TimePickerWrapper.defaultProps = {
  customTriggerId: null,
  focused: false,
  defaultTime: null,
  meridiem: null,
  timeMode: null,
  timezone: timeHelper.guessUserTz(),
  showTimezone: false,
  editableTimezone: false
};

export default TimePickerWrapper;
