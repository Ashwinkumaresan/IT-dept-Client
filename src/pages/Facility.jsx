import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Facility = () => {
    const printerData = [
        { sno: 1, config: 'Ricoh 2014R Copier', count: 1 },
        { sno: 2, config: 'HP LaserJet printer Model 1018', count: 1 },
        { sno: 3, config: 'HP LaserJet printer M401 DN', count: 1 },
        { sno: 4, config: 'Wep DSI 5235 Dot Matrix Printer', count: 16 },
    ];

    const systemData = [
        {
            sno: 1,
            config:
                "Core i7 HP Pro 409 G9 Tower Desktop, Intel Core i7-13700 13th Gen Processor, Q670 Chipset, 16 GB DDR4 RAM, 512 GB M2 NVME SSD, 1 TB SATA HDD, HP 21.5’’ Monitor = 66",
            count: 75,
        },
        {
            sno: 2,
            config:
                'HP Pro G1 MT -Core i7,16GB RAM, 1TB HDD,18.5 “TFT Monitor',
            count: 216,
            rowspan: 6,
        },
        {
            sno: 3,
            config:
                'Corei5 HP 280 G9 Intel Core i5-12500, 12th Gen Processor, 16 GB DDR4 RAM, 1 TB SATA HDD, 21.5” TFT Monitor',
        },
        {
            sno: 4,
            config:
                'HP 280 G6 MT Desktop, Intel core i5, 10th Gen processor, 8GB DDR4 RAM, 1 TB HDD, 21.5” FHD Monitor',
        },
        {
            sno: 5,
            config:
                'HP Pro 3330 MT Desktop: Intel Corei5 - 3470 (3.2 Ghz), 8 GB RAM, 500 GB HDD, K/b, Mouse, HP 18.5" LED Monitor',
        },
        {
            sno: 6,
            config:
                'HP Pro Intel Corei5, 3 GHz/4590/ 8 GB RAM,500 GB HDD, HP 18.5" LED Monitor',
        },
        {
            sno: 7,
            config:
                'HP 202 G2 MT Business PC: Intel Core i5-4570 (4th Generation) Processor, 8 GB DDR3 RAM/ 500 GB SATA Hard Disk/ No DVD Writer/USB keyboard & Mouse/ HP 18.5” LED',
        },
        {
            sno: 8,
            config:
                'Core i3 Dell Desktop - Optiplex : Intel Core i3 - 2120 Processor, 4 GB DDR III RAM, 500 GB HDD, Dell USB K/b & Mouse, Dell 18.5" LED Monitor',
            count: 17,
            rowspan: 3,
        },
        {
            sno: 9,
            config:
                'HP Elite 7100 - Core i3, 4 GB DDR3 Ram, 320 GB Sata Hdd, 18.5" TFT Monitor',
        },
        {
            sno: 10,
            config:
                'HP Pro3330 Corei3 2nd generation 2120 Desktop: Intel Corei3/2120/4 GB Ram,500 GB HDD, HP 18.5" LED Monitor',
        },
    ];

    const laptops = [
        { sno: 1, config: "HP Laptop Intel Core i7, 8 GB DDR3 RAM, 1 TB HDD", number: 1 },
        { sno: 2, config: "HP 250 G8 Notebook Intel Core i5, 8 GB RAM, 1 TB SATA HDD, 15\" HD Display, windows 10 professional", number: 2 },
        { sno: 3, config: "HP 450 Laptop: Core i5, 4 GB RAM, 500 GB HDD", number: 3 },
        { sno: 4, config: "HP Laptop Intel Core i3, 4 GB DDR3 RAM, 500 GB HDD", number: 1 },
        { sno: 5, config: "HP Laptop Intel Core i3, 2 GB DDR3 RAM, 320 GB HDD", number: 8 },
    ];

    const iotDevices = [
        { sno: 1, config: "Raspberry Pi3 kit-1", number: 2 },
        { sno: 2, config: "Raspberry Pi-3 Motherboard", number: 1 },
        { sno: 3, config: "Raspberry Pi 5MP camera board module", number: 1 },
        { sno: 4, config: "Raspberry Pi LCD Display module 3.2", number: 1 },
        { sno: 5, config: "Sensor module kit (40 Sensors)", number: 1 },
        { sno: 6, config: "Arduino Atmega2560 board+USB cable", number: 15 },
        { sno: 7, config: "Arduino distance range finder module", number: 1 },
        { sno: 8, config: "Optocoulper driver", number: 1 },
        { sno: 9, config: "Wifi wireless transceiver module for IoT", number: 1 },
    ];

    const projectors = [
        { sno: 1, config: "Epson X31", number: 6 },
        { sno: 2, config: "Hitachi CP EX 3551", number: 2 },
        { sno: 3, config: "Infocus Projector P131", number: 4 },
    ];

    return (
        <div className="container py-5">

            <img src="/facility_sm.png" className='my-5 img-fluid d-lg-none d-block img-hover-scale border rounded' alt="facility" style={{ height: "70vh" }} />
            <img src="/facility_lg.png" className='my-5 img-fluid d-none d-lg-block img-hover-scale border rounded' alt="facility" style={{height:"70vh", width:"100vw"}} />

            <div className="row">
                <div className="col-12 col-lg-6 d-flex flex-column justify-content-center">
                    <h1>Alpha Cloud</h1>
                    <p className='fs-14 justify'>We owned the 250GB Alpha Cloud plan from MilesWeb, and it has been a reliable option for our hosting needs. With 250GB of NVMe SSD storage, 4GB RAM, and 2 CPU cores, it delivers smooth performance and efficiently handles multiple websites. The plan supports hosting for up to 400 websites, includes unmetered bandwidth, 150 email accounts, daily backups, unlimited SSL certificates, and strong DDoS protection. It also offers a free domain and an AI website builder, making it a complete and convenient package for managing our online projects.</p>
                </div>
                <div className="col-12 col-lg-6">
                    <img src="/alphaCloud.png" className='img-fluid' alt="Alpha Cloud" />
                </div>
            </div>

            {/* Printers Table */}
            <h4 className="mt-4">Printers</h4>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>S.No.</th>
                            <th>Printer Configuration</th>
                            <th>No. of Printers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {printerData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.sno}</td>
                                <td>{item.config}</td>
                                <td>{item.count}</td>
                            </tr>
                        ))}
                        <tr className="fw-bold">
                            <td colSpan="2">Total</td>
                            <td>{printerData.reduce((total, item) => total + item.count, 0)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Computers Table */}
            <h4 className="mt-5">Computers</h4>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>S.No.</th>
                            <th>System Configuration</th>
                            <th>No. of Systems</th>
                        </tr>
                    </thead>
                    <tbody>
                        {systemData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.sno}</td>
                                <td>{item.config}</td>
                                {item.count && (
                                    <td rowSpan={item.rowspan}>{item.count}</td>
                                )}
                            </tr>
                        ))}
                        <tr className="fw-bold">
                            <td colSpan="2">Total</td>
                            <td>308</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Configuration */}
            <h4 className="mt-5">Laptops</h4>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>S.No.</th>
                            <th>Configuration</th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {laptops.map((item) => (
                            <tr key={item.sno}>
                                <td>{item.sno}</td>
                                <td>{item.config}</td>
                                <td>{item.number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* IOT */}
            <h4 className="mt-5">IoT Devices</h4>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>S.No.</th>
                            <th>Configuration</th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {iotDevices.map((item) => (
                            <tr key={item.sno}>
                                <td>{item.sno}</td>
                                <td>{item.config}</td>
                                <td>{item.number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-5">
                <h4>Switch</h4>
                <p>Network Switch = 24 No’s</p>
            </div>

            {/* Projector */}
            <h4 className="mt-5">Projector</h4>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>S.No.</th>
                            <th>Projector Configuration</th>
                            <th>No. of Projectors</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectors.map((item) => (
                            <tr key={item.sno}>
                                <td>{item.sno}</td>
                                <td>{item.config}</td>
                                <td>{item.number}</td>
                            </tr>
                        ))}
                        <tr className="fw-bold">
                            <td colSpan="2">Total</td>
                            <td>{projectors.reduce((total, item) => total + item.number, 0)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
