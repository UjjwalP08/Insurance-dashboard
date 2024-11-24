import { Card, Row } from 'antd'
import React from 'react'
import Heading from '../../../component/common/Heading'
import CRUDComponent from '../../../component/common/CRUD-Component'
import CONSTANTS from '../../../util/constant/CONSTANTS'

const Inquiry = () => {
    return (
        <>
            <Card className="my-5">
                <Heading>Inquiries</Heading>
                <Row>
                    <CRUDComponent

                        GET={{
                            API: CONSTANTS.API.inquiry.getAll,

                            DataModifier: (res, API, Setrefresh) => {
                                return res?.map((data, i) => {
                                    return {
                                        ...data,
                                        no: `I${(data["_id"]).toString().padStart(7, "0")}`,
                                    }
                                })
                            },
                            column: CONSTANTS.TABLE.INQUIRY,
                        }}

                        DELETE={{
                            API: CONSTANTS.API.inquiry.delete,
                            message: "Deleted Inquiries Successfully",
                        }}
                    // isSearch={true}

                    />
                </Row>
            </Card>
        </>
    )
}

export default Inquiry