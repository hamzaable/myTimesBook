import { CalendarOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Typography, DatePicker } from 'antd';
import moment from 'moment';
import React, { useState } from 'react'

function DateRow(props:any) {

	const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <div
				style={{
					display: "flex",
					gap: "30px",
					placeContent: "center flex-start",
					alignItems: "center",
                    width:"100%"
				}}
			>
				<div>
					<Typography.Title
						level={3}
						style={{
							lineHeight: "1.6",
							marginBottom: "0px",
                            width: "165px"
						}}
					>
						{
                        props.activeDate.format("DD.MM.YYYY") === moment(new Date()).format(("DD.MM.YYYY")) ?
                        "Today, " + props.activeDate.format("DD MMM") :
                        props.activeDate.format("ddd, DD MMM")

                        
                        }
					</Typography.Title>
				</div>
				<div>
					<CalendarOutlined
						onClick={() => setShowDatePicker(!showDatePicker)}
					/>

					<DatePicker
						defaultValue={moment("2015-01-01", "YYYY-MM-DD")}
						inputReadOnly
						allowClear={false}
						bordered={false}
						open={showDatePicker}
						onSelect={(e) => {
							props.setActiveDate(e);
							setShowDatePicker(false);
						}}
						style={{
							border: "0px",
							background: "transparent",
							padding: "0px",
							margin: "0px",
							visibility: "hidden",
							width: "0px",
						}}
					/>
				</div>
				<div
					onClick={() =>
						props.setActiveDate(moment(props.activeDate).subtract(1,'days'))
					}
                    style={{cursor:'pointer'}}
				>
					<ArrowLeftOutlined />
				</div>
				<div
                onClick={() =>
                    props.setActiveDate(moment(props.activeDate).add(1,'days'))
                }
                style={{cursor:'pointer'}}
                >
					<ArrowRightOutlined />
				</div>
			</div>
    )
}

export default DateRow
