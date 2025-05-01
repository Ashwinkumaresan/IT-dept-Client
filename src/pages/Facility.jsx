import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Facility = () => {
    return (
        <div className="container py-5">
            <img src="/facility_sm.png" className='my-5 img-fluid d-lg-none d-block' alt="facility" style={{height:"70vh"}} />
            <img src="/facility_lg.png" className='my-5 img-fluid d-none d-lg-block' alt="facility" />


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
                        <tr>
                            <td>1</td>
                            <td>Ricoh 2014R Copier</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>HP LaserJet printer Model 1018</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>HP LaserJet printer M401 DN</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Wep DSI 5235 Dot Matrix Printer</td>
                            <td>16</td>
                        </tr>
                        <tr className="fw-bold">
                            <td colSpan="2">Total</td>
                            <td>19</td>
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
                        <tr>
                            <td>1</td>
                            <td>
                                Core i7 HP Pro 409 G9 Tower Desktop, Intel Core i7-13700 13th Gen
                                Processor, Q670 Chipset ,16 GB DDR4 RAM, 512 GB M2 NVME SSD, 1 TB SATA
                                HDD, HP 21.5’’ Monitor = 66
                            </td>
                            <td>75</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>HP Pro G1 MT -Core i7,16GB RAM, 1TB HDD,18.5 “TFT Monitor</td>
                            <td rowSpan="6">216</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>
                                Corei5 HP 280 G9 Intel Core i5-12500, 12th Gen Processor, 16 GB DDR4 RAM,
                                1 TB SATA HDD, 21.5” TFT Monitor
                            </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>
                                HP 280 G6 MT Desktop, Intel core i5, 10th Gen processor, 8GB DDR4 RAM, 1
                                TB HDD, 21.5” FHD Monitor
                            </td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>
                                HP Pro 3330 MT Desktop: Intel Corei5 - 3470 (3.2 Ghz), 8 GB RAM, 500 GB
                                HDD, K/b, Mouse, HP 18.5" LED Monitor
                            </td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>
                                HP Pro Intel Corei5, 3 GHz/4590/ 8 GB RAM,500 GB HDD, HP 18.5" LED
                                Monitor
                            </td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>
                                HP 202 G2 MT Business PC: Intel Core i5-4570 (4th Generation)
                                Processor, 8 GB DDR3 RAM/ 500 GB SATA Hard Disk/ No DVD Writer/USB
                                keyboard & Mouse/ HP 18.5” LED
                            </td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>
                                Core i3 Dell Desktop - Optiplex : Intel Core i3 - 2120 Processor, 4 GB
                                DDR III RAM, 500 GB HDD, Dell USB K/b & Mouse, Dell 18.5" LED Monitor
                            </td>
                            <td rowSpan="3">17</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>HP Elite 7100 - Core i3, 4 GB DDR3 Ram, 320 GB Sata Hdd, 18.5" TFT Monitor</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>
                                HP Pro3330 Corei3 2nd generation 2120 Desktop: Intel Corei3/2120/4 GB
                                Ram,500 GB HDD, HP 18.5" LED Monitor
                            </td>
                        </tr>
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
                        <tr>
                            <td>1</td>
                            <td>HP Laptop Intel Core i7, 8 GB DDR3 RAM, 1 TB HDD</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>HP 250 G8 Notebook Intel Core i5, 8 GB RAM, 1 TB SATA HDD, 15" HD Display, windows 10 professional</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>HP 450 Laptop: Core i5, 4 GB RAM, 500 GB HDD</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>HP Laptop Intel Core i3, 4 GB DDR3 RAM, 500 GB HDD</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>HP Laptop Intel Core i3, 2 GB DDR3 RAM, 320 GB HDD</td>
                            <td>8</td>
                        </tr>
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
                        <tr>
                            <td>1</td>
                            <td>Raspberry Pi3 kit-1</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Raspberry Pi-3 Motherboard</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Raspberry Pi 5MP camera board module</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Raspberry Pi LCD Display module 3.2</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Sensor module kit (40 Sensors)</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Arduino Atmega2560 board+USB cable</td>
                            <td>15</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>Arduino distance range finder module</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>Optocoulper driver</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>Wifi wireless transceiver module for IoT</td>
                            <td>1</td>
                        </tr>
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
                        <tr>
                            <td>1</td>
                            <td>Epson X31</td>
                            <td>6</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Hitachi CP EX 3551</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Infocus Projector P131</td>
                            <td>4</td>
                        </tr>
                        <tr className="fw-bold">
                            <td colSpan="2">Total</td>
                            <td>12</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};
