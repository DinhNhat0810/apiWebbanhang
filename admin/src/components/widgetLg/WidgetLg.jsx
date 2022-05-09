import './widgetLg.scss'



const WidgetLg = () => {

    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>;
    }

    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Giao dich gần nhất</h3>
            <table className="widgetLgTable">
                <tbody>
                    <tr className="widgetLgTr">
                        <th className="widgetLgTh">Khách hàng</th>
                        <th className="widgetLgTh">Ngày giao dịch</th>
                        <th className="widgetLgTh">Số lượng</th>
                        <th className="widgetLgTh">Trạng thái</th>
                    </tr>

                    <tr className="widgetLgTr">
                        <td className="widgetLgUser">
                            <img
                            src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            alt=""
                            className="widgetLgImg"
                            />
                            <span className="widgetLgName">Phạm Đình Nhật</span>
                        </td>
                        <td className="widgetLgDate">2 Jun 2021</td>
                        <td className="widgetLgAmount">$122.00</td>
                        <td className="widgetLgStatus">
                            <Button type="Approved" />
                        </td>
                    </tr>

                    <tr className="widgetLgTr">
                        <td className="widgetLgUser">
                            <img
                            src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            alt=""
                            className="widgetLgImg"
                            />
                            <span className="widgetLgName">Phạm Đình Nhật</span>
                        </td>
                        <td className="widgetLgDate">2 Jun 2021</td>
                        <td className="widgetLgAmount">$122.00</td>
                        <td className="widgetLgStatus">
                            <Button type="Declined" />
                        </td>
                    </tr>

                    <tr className="widgetLgTr">
                        <td className="widgetLgUser">
                            <img
                            src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            alt=""
                            className="widgetLgImg"
                            />
                            <span className="widgetLgName">Phạm Đình Nhật</span>
                        </td>
                        <td className="widgetLgDate">2 Jun 2021</td>
                        <td className="widgetLgAmount">$122.00</td>
                        <td className="widgetLgStatus">
                            <Button type="Pending" />
                        </td>
                    </tr>

                    <tr className="widgetLgTr">
                        <td className="widgetLgUser">
                            <img
                            src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            alt=""
                            className="widgetLgImg"
                            />
                            <span className="widgetLgName">Phạm Đình Nhật</span>
                        </td>
                        <td className="widgetLgDate">2 Jun 2021</td>
                        <td className="widgetLgAmount">$122.00</td>
                        <td className="widgetLgStatus">
                            <Button type="Approved" />
                        </td>
                    </tr>
                </tbody>

                
            </table>
        </div>
    )
}   

export default WidgetLg