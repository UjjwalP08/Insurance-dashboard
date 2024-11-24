import { Card, Row } from 'antd'
import React from 'react'
import Heading from '../../../component/common/Heading'
import CRUDComponent from '../../../component/common/CRUD-Component'
import CONSTANTS from '../../../util/constant/CONSTANTS'
import { convertLocalToUTC } from '../../../util/functions'

const Request = () => {
    return (
        <>
            <Card className="my-5">
                <Heading>Request</Heading>
                <Row>
                    <CRUDComponent

                        GET={{
                            API: CONSTANTS.API.request.getAll,

                            DataModifier: (res, API, Setrefresh) => {
                                return res?.map((data, i) => {
                                    return {
                                        ...data,
                                        no: `R${(data["_id"]).toString().padStart(7, "0")}`,
                                        dateTime: convertLocalToUTC(data?.preparationDateTime, 'DD MMM YYYY hh:mm A'),
                                    }
                                })
                            },
                            column: CONSTANTS.TABLE.REQUEST,
                        }}

                        DELETE={{
                            API: CONSTANTS.API.request.delete,
                            message: "Deleted Request Successfully",
                        }}
                    // isSearch={true}

                    />
                </Row>
            </Card>
        </>
    )
}

export default Request