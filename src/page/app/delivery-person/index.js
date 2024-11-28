import { Card, Row } from 'antd'
import React from 'react'
import Heading from '../../../component/common/Heading'
import CRUDComponent from '../../../component/common/CRUD-Component'
import CONSTANTS from '../../../util/constant/CONSTANTS'
import { convertLocalToUTC } from '../../../util/functions'
// import moment from 'moment'
// import dayjs from 'dayjs'

const DeliveryPerson = () => {
    return (
        <>
            <Card className="my-5">
                <Heading>Bill</Heading>
                <Row>
                    <CRUDComponent
                        isSearch
                        GET={{
                            API: CONSTANTS.API.BILL.getAll,

                            DataModifier: (res, API, Setrefresh) => {
                                return res?.map((data, i) => {
                                    return {
                                        ...data,
                                        no: `B${(data["_id"]).toString().padStart(7, "0")}`,
                                        billingDate: convertLocalToUTC(data?.billingDate, "DD/MM/YYYY"),
                                        endTime: convertLocalToUTC(data?.endTime, 'hh:mm A', "HH:mm:ss"),
                                    }
                                })
                            },
                            column: CONSTANTS.TABLE.BILL_LIST,
                        }}
                        UPDATE={{
                            API: CONSTANTS.API.BILL.update,
                            message: "Updated Bill successfully",
                            modaltitle: "Update Bill",
                            modalFields: CONSTANTS.FORM_FIELD.EDIT_BILL_MODAL,
                            isFormData: true,
                            // payloadModifier: (res) => {
                            //     let payload = {
                            //         ...res,
                            //         mobile: +res?.mobile,
                            //         startTime: convertLocalToUTC(res?.startTime, "HH:mm:ss", "HH:mm:ss"),
                            //         endTime: convertLocalToUTC(res?.endTime, "HH:mm:ss", "HH:mm:ss"),
                            //     }
                            //     return payload
                            // },
                        }}
                        CREATE={{
                            API: CONSTANTS.API.BILL.add,
                            message: "Add Bill Data successfully",
                            modaltitle: "Add Bill  Data",
                            modalFields: CONSTANTS.FORM_FIELD.BILL_MODAL,
                            isFormData: true,
                            // payloadModifier: (res) => {
                            //     console.log(res, moment.utc(res?.startTime))
                            //     return {
                            //         ...res,
                            //         billingDate: dayjs(res?.billingDate)
                            //     }
                            // },
                        }}
                        DELETE={{
                            API: CONSTANTS.API.BILL.delete,
                            message: "Deleted Bill Successfully",
                        }}
                    // isSearch={true}

                    />
                </Row>
            </Card>
        </>
    )
}

export default DeliveryPerson